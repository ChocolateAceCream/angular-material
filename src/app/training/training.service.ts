import { Exercise } from './exercise.model';
import { Subject } from'rxjs/Subject';
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
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

    getAvailableExercises() {
        return this.availableExercises.slice();
    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    }
}
