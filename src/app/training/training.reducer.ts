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
}

//export interface State extends fromRoot.State{
//    training: TrainingState
//};

const initialState: State = {
    finishedExercises: [],
    activeTraining: null
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
                activeTraining: action.payload
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
