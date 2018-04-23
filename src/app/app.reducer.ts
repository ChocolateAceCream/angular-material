//merge various of reducers our app has

//used to map all reduceres to state slice
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUi from './shared/ui.reducer';

//we should have a reducer per state slice
export interface State {
    ui: fromUi.State
}

export const reducers: ActionReducerMap<State> = {
    ui: fromUi.uiReducer
};

//utility function to pull info from state, for e.g. this following function
//allow us quickly pull out ui: fromUi.State info that returned from
//fromUi.uiReducer by simply calling getUiState function. the string 'ui' tell
//the function to target the ui state. so that you dont have to call
//state.ui.etc
export const getUiState = createFeatureSelector<fromUi.State>('ui');

//use createSelector to get getisLoading State. createSelector need two
//argument, state and action. 1st argument we pass the reference of getUiState
//function, so this function will be triggered once getIsLoaindg is called,
//return 'ui' state slicem which become a input for 2nd argument,
//fromUi.getisLoading function, then return the isLoaindg proporty of state.
//p.S. we only pass the reference, not actually call the function until
//getisLoaindg is triggered. Now we are able to extract isLoaindg property from
//the state.
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);