//service provide in app.module.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UIService } from'../shared/ui.service';
import 'rxjs/add/operator/toPromise';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer'; //it's convincion to name store related file lowercase'

//inject route service

interface AccessToken {
    token: string;
}
@Injectable()

export class AuthService {
    authChange = new Subject<boolean>();
    private user: User;

    constructor(
        private router: Router,
        private http: HttpClient,
        private uiService: UIService,
        private store: Store<{ui: fromApp.State}>
    ) {}

    registerUser(authData: AuthData) {
        //this.uiService.loadingStateChanged.next(true);
        this.store.dispatch({type: 'START_LOADING'});
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
        this.http.post<AccessToken>(
            `http://192.168.1.11:3000/signup.json`,
            this.user,
            httpOptions
        ).toPromise()
            .then(result => {
                this.store.dispatch({type: 'STOP_LOADING'});
                this.authSuccessfully(result.token);
            })
            .catch(error => {
                this.store.dispatch({type: 'STOP_LOADING'});

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
        this.store.dispatch({type: 'START_LOADING'});
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
        this.http.post<AccessToken>(
            `http://192.168.1.11:3000/login.json`,
            this.user,
            httpOptions
        ).toPromise()
            .then(result => {
                this.store.dispatch({type: 'STOP_LOADING'});
                //this.uiService.loadingStateChanged.next(false);
                this.authSuccessfully(result.token);
            })
            .catch(error => {
                this.store.dispatch({type: 'STOP_LOADING'});
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
        this.authChange.next(false);
        localStorage.removeItem('accessToken');
        this.router.navigate(['/login']);
    }

    getUser() {
        return {...this.user};
    }

    isAuth() {
        return <string>localStorage.getItem('accessToken') != null;
    }

    private authSuccessfully(token: string) {
        localStorage.setItem('accessToken', token);
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}
