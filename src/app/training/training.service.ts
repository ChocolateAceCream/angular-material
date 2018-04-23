import { Exercise } from './exercise.model';
import { Subject } from'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { UIService } from'../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer'; //it's convincion to name store related file lowercase'
import * as UI from '../shared/ui.actions';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    finishedExercisesChanged = new Subject<Exercise[]>();
    token: string;
    //this subject will hold a payload type of Exercise
    private availableExercises: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 128},
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 228},
        { id: 'burpees', name: 'Brupees', duration: 60, calories: 348},
    ];

    //by turnning availableExercises into private array and add a method to
    //return a slice of it(copy of it), now we can edit it without changing the
    //origional array
    private runningExercise: Exercise;

    //store the completed exercise
    exercises: Exercise[] = [];

    constructor(
        private http: HttpClient,
        private uiService: UIService,
        private store: Store<fromRoot.State>
    ){}

    ngOnInit() {
        this.getDataFromDatabase();
    }

    getAvailableExercises() {
        return this.availableExercises.slice();
    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({...this.runningExercise});
    }

    completeExercise() {
        this.addDataToDatabase({
            ...this.runningExercise,
            date: new Date(),
            state : "completed"
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.addDataToDatabase({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            date: new Date(),
            state : "cancelled"
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    //return a copy of current running exercise
    getRunningExercise() {
        return {...this.runningExercise};
    }

    getCompletedOrCancelledExercises() {
        return this.exercises.slice();
    }

    private addDataToDatabase(exercise: Exercise) {
        this.token = localStorage.getItem('accessToken');
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Authorization': `Bearer ${this.token}`
            })
        };
        this.http.post(
            `http://192.168.1.11:3000/exercises/create.json`,
            exercise,
            httpOptions
        ).toPromise()
            .then(result => {
                this.store.dispatch(new UI.StopLoading());
            })
            .catch(error => {
                this.store.dispatch(new UI.StopLoading());
                if (error.status === 401)
                {
                    this.uiService.showSnackbar(error.error.errors[0].detail,null,3000);
                } else {
                    this.uiService.showSnackbar('server not reachable, please retry later',null,3000);
                }
            });
    }

    getDataFromDatabase() {
        this.store.dispatch(new UI.StartLoading());
        this.token = localStorage.getItem('accessToken');
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Authorization': `Bearer ${this.token}`
            })
        };
        this.http.get<Exercise[]>(
            `http://192.168.1.11:3000/exercises/index.json`,
            httpOptions
        ).toPromise()
            .then((result: Exercise[]) => {
                this.store.dispatch(new UI.StopLoading());
                this.finishedExercisesChanged.next(result);
                this.exercises = result;
            }).catch(error => {
                if (error.status === 401)
                {
                    this.store.dispatch(new UI.StopLoading());
                    this.uiService.showSnackbar(error.error.errors[0].detail,null,3000);
                } else {
                    this.store.dispatch(new UI.StopLoading());
                    this.uiService.showSnackbar('server not reachable, please retry later',null,3000);
                }
            });

    }
}
