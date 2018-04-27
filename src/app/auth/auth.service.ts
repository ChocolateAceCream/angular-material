//service provide in app.module.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//import { Subject } from 'rxjs/Subject';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UIService } from'../shared/ui.service';
import 'rxjs/add/operator/toPromise';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer'; //it's convincion to name store related file lowercase'
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';

//inject route service

interface AccessToken {
    token: string;
}
@Injectable()

export class AuthService {
    //authChange = new Subject<boolean>();
    private user: User;
    private rememberMe: boolean;

    constructor(
        private router: Router,
        private http: HttpClient,
        private uiService: UIService,
        private store: Store<fromRoot.State>
    ) {}

    registerUser(authData: AuthData) {
        //this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new UI.StartLoading());
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            })
        };

        this.user = {
            email: authData.email,
            password: authData.password
        };

        this.rememberMe = authData.remember;

        this.http.post<AccessToken>(
            `http://69.113.182.79:3000/signup.json`,
            this.user,
            httpOptions
        ).toPromise()
            .then(result => {
                this.store.dispatch(new UI.StopLoading());
                this.authSuccessfully(result.token);
            })
            .catch(error => {
                this.store.dispatch(new UI.StopLoading());

                //this.uiService.loadingStateChanged.next(false);
                if (error.status === 401)
                {
                    this.uiService.showSnackbar(error.error.errors[0].detail,null,3000);
                } else {
                    this.uiService.showSnackbar('server not reachable, please retry later',null,3000);
                }
            });
    }

    login(authData: AuthData) {
        //this.uiService.loadingStateChanged.next(true);
        this.store.dispatch(new UI.StartLoading());
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            })
        };
        this.user = {
            email: authData.email,
            password: authData.password
        };
        this.rememberMe = authData.remember;
        this.http.post<AccessToken>(
            `http://69.113.182.79:3000/login.json`,
            this.user,
            httpOptions
        ).toPromise()
            .then(result => {
                this.store.dispatch(new UI.StopLoading());
                //this.uiService.loadingStateChanged.next(false);
                this.authSuccessfully(result.token);
            })
            .catch(error => {
                this.store.dispatch(new UI.StopLoading());
                if (error.status === 401)
                {
                    // this.uiService.loadingStateChanged.next(false);
                    this.uiService.showSnackbar(error.error.errors[0].detail,null,3000);
                } else {
                    // this.uiService.loadingStateChanged.next(false);
                    this.uiService.showSnackbar('server not reachable, please retry later',null,3000);
                }
            });
    }

    logout() {
        this.user = null;
        //now control by store
        //this.authChange.next(false);
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.store.dispatch(new Auth.UnsetToken());
        localStorage.removeItem('accessToken');
        this.router.navigate(['/login']);
    }

    getUser() {
        return {...this.user};
    }

    //    isAuth() {
    //        return <string>localStorage.getItem('accessToken') != null;
    //    }

    private authSuccessfully(token: string) {
        if (this.rememberMe){
            localStorage.setItem('accessToken', token);
        }

        this.store.dispatch(new Auth.SetToken(token));
        this.store.dispatch(new Auth.SetAuthenticated());
        //this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}
