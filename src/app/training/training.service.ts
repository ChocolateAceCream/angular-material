import { Exercise } from './exercise.model';
import { Subject } from'rxjs/Subject';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { UIService } from'../shared/ui.service';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import * as fromRoot from '../app.reducer'; //it's convincion to name store related file lowercase'
import * as UI from '../shared/ui.actions';
import * as Auth from '../auth/auth.actions';
import * as Training from './training.actions';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TrainingService {
    //exerciseChanged = new Subject<Exercise>();
    //finishedExercisesChanged = new Subject<Exercise[]>();
    token$: string = '';
    //this subject will hold a payload type of Exercise
    private availableExercises$: Exercise[];

    //by turnning availableExercises into private array and add a method to
    //return a slice of it(copy of it), now we can edit it without changing the
    //origional array
    //private runningExercise: Exercise;

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
        this.store.select(fromRoot.getAvailableExercises).pipe(take(1)).subscribe( ex => {
            this.availableExercises$ = ex;
        });
        return this.availableExercises$.slice();
    }

    startExercise(selectedId: string) {
        //    this.runningExercise = this.availableExercises$.find(ex => ex.id === selectedId);
        //    this.exerciseChanged.next({...this.runningExercise});
        this.store.dispatch(new Training.StartTraining(selectedId));
    }

    completeExercise() {
        this.store.select(fromRoot.getActiveTraining).pipe(take(1)).subscribe( ex => {
            this.addDataToDatabase({
                ...ex,
                date: new Date(),
                state : "completed"
            });
            this.store.dispatch(new Training.StopTraining);
        });
        //
        //this.runningExercise = null;
        //this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.store.select(fromRoot.getActiveTraining).pipe(take(1)).subscribe( ex => {
            this.addDataToDatabase({
                ...ex,
                duration: ex.duration * (progress / 100),
                calories: ex.calories * (progress / 100),
                date: new Date(),
                state : "cancelled"
            });
            this.store.dispatch(new Training.StopTraining);
        });

        //this.runningExercise = null;
        //this.exerciseChanged.next(null);
    }

    //return a copy of current running exercise
    // getRunningExercise() {
    //     return {...this.runningExercise};
    // }

    //getCompletedOrCancelledExercises() {
    //    return this.exercises.slice();
    //}

    private addDataToDatabase(exercise: Exercise) {
        this.store.select(fromRoot.getToken).pipe(take(1)).subscribe( token => {
            this.token$ = token;
        });
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Authorization': `Bearer ${this.token$}`
            })
        };
        this.http.post(
            `https://evening-retreat-93531.herokuapp.com/exercises/create.json`,
            //`http://69.113.182.79:3000/exercises/create.json`,
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
        this.store.select(fromRoot.getToken).pipe(take(1)).subscribe( token => {
            this.token$ = token;
        });
        this.store.dispatch(new UI.StartLoading());
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Authorization': `Bearer ${this.token$}`
            })
        };
        this.http.get<Exercise[]>(
            `https://evening-retreat-93531.herokuapp.com/exercises/index.json`,
            //`http://69.113.182.79:3000/exercises/index.json`,
            httpOptions
        ).toPromise()
            .then((result: Exercise[]) => {
                this.store.dispatch(new UI.StopLoading());
                this.store.dispatch(new Training.SetFinishedTraining(result));
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
