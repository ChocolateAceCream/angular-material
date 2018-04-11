//service provide in app.module.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

//inject route service

interface AccessToken {
    token: string;
}
@Injectable()

export class AuthService {
    authChange = new Subject<boolean>();
    private user: User;

    constructor(private router: Router, private http: HttpClient) {}

    registerUser(authData: AuthData) {
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
            console.log(result.token);
            this.authSuccessfully(result.token);
        })
        .catch(error => {
            console.log(error);
        });
    }

    login(authData: AuthData) {
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
            console.log(result.token);
            this.authSuccessfully(result.token);
        })
        .catch(error => {
            console.log(error);
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
