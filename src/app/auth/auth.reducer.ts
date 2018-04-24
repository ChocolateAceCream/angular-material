import { Action } from '@ngrx/store';
import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './auth.actions';
export interface State {
    isAuthenticated: boolean
    //token: string;
};

const initialState: State = {
    isAuthenticated: !!localStorage.getItem('accessToken')
    //token: localStorage.getItem('accessToken');
};

export function authReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                isAuthenticated: true
            };
        case SET_UNAUTHENTICATED:
            return {
                isAuthenticated: false
            };
        default: {
            return state
        };
    }
}

export const getIsAuth = (state: State) => state.isAuthenticated;

//this getisloading function take state as input, then return the isLoading
//property
//export const getToken = (state: State) => state.token;
//export const getIsAuthenticated = (state: State) => state.isAuthenticated;
