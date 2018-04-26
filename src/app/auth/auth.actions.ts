import { Action } from '@ngrx/store';

export const SET_AUTHENTICATED = '[AUTH] Set Authenticated';
export const SET_UNAUTHENTICATED = '[AUTH] Set Unauthenticated';
export const SET_TOKEN = '[AUTH] Set Token';
export const UNSET_TOKEN = '[AUTH] Unset Token';
//export const SET_TOKEN = '[AUTH] Set Unauthenticated';

export class SetAuthenticated implements Action {
    readonly type = SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
    readonly type = SET_UNAUTHENTICATED;
}

export class SetToken implements Action {
    readonly type = SET_TOKEN;
    constructor(public payload: string) {};
}

export class UnsetToken implements Action {
    readonly type = UNSET_TOKEN;
}

export type AuthActions =
    SetAuthenticated |
    SetToken |
    UnsetToken |
    SetUnauthenticated;
