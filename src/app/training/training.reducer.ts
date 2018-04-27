import { Action } from '@ngrx/store';
import { Exercise } from './exercise.model';
import * as fromRoot from '../app.reducer';
import {
    TrainingActions,
    SET_FINISHED_TRAINING,
    START_TRAINING,
    STOP_TRAINING
} from './training.actions';

export interface State {
    finishedExercises: Exercise[];
    activeTraining: Exercise;
    availableExercises: Exercise[];
}
//export interface State extends fromRoot.State{
//    training: TrainingState
//};

const initialState: State = {
    finishedExercises: [],
    activeTraining: null,
    availableExercises: [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 128},
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 228},
        { id: 'burpees', name: 'Brupees', duration: 60, calories: 348},
    ]
};

export function trainingReducer(state = initialState, action: TrainingActions) {
    switch (action.type) {
        case SET_FINISHED_TRAINING:
            return {
                ...state,
                finishedExercises: action.payload
            };
        case START_TRAINING:
            return {
                ...state,
                activeTraining: state.availableExercises.find(
                    ex => ex.id === action.payload
                )
            };
        case STOP_TRAINING:
            return {
                ...state,
                activeTraining: null
            };
        default: {
            return state
        };
    }
}

//helper function
export const getFinishedExercises = (state: State) => state.finishedExercises;
export const getActiveTraining = (state: State) => state.activeTraining;
export const getAvailableExercises = (state: State) => state.availableExercises;
export const getIsTraining = (state: State) => state.activeTraining != null;
