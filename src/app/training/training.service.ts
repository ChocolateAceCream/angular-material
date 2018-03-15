import { Exercise } from './exercise.model';
import { Subject } from'rxjs/Subject';
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
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
    private exercises: Exercise[] = [];

    getAvailableExercises() {
        return this.availableExercises.slice();
    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({...this.runningExercise});
    }

    completeExercise() {
        this.exercises.push({
            ...this.runningExercise,
            date: new Date(),
            state : "completed"
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.exercises.push({
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
}
