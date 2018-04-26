import { Action } from '@ngrx/store';
import {
    AuthActions,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    SET_TOKEN,
    UNSET_TOKEN
} from './auth.actions';

export interface State {
    isAuthenticated: boolean,
    token: string | null
};

const initialState: State = {
    isAuthenticated: !!localStorage.getItem('accessToken'),
    token: localStorage.getItem('accessToken')
};

export function authReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: true
            };
        case SET_UNAUTHENTICATED:
            return {
                ...state,
                isAuthenticated: false
            };
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        case UNSET_TOKEN:
            return {
                ...state,
                token: null
            };

        default: {
            return state
        };
    }
}

export const getIsAuth = (state: State) => state.isAuthenticated;

//this getisloading function take state as input, then return the isLoading
//property
export const getToken = (state: State) => state.token;
//export const getIsAuthenticated = (state: State) => state.isAuthenticated;
