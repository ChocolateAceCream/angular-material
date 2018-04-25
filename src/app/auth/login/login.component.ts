import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from'../../shared/ui.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    isLoading$: Observable<boolean>;
    isAuth$: Observable<boolean>;

    constructor(
        private authService: AuthService,
        private uiService: UIService,
        private router: Router,
        private store: Store<fromRoot.State>

    ) { }

    ngOnInit() {

        this.isAuth$ = this.store.select(fromRoot.getIsAuth);
        this.isAuth$.subscribe((isAuth) => {
            if (isAuth) {
                this.router.navigate(['/training']);
            }
        });

        this.isLoading$ = this.store.select(fromRoot.getIsLoading);

        //this.loadingSubs = this.uiService.loadingStateChanged.subscribe(isLoading => {
        //    this.isLoading = isLoading;
        //});
        this.loginForm = new FormGroup({
            email: new FormControl('', {validators: [Validators.required, Validators.email]}),
            password: new FormControl('', {validators: [Validators.required]})
        })
    }

    onSubmit() {
        this.authService.login({
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        });
    }

    //ngOnDestroy() {
    //    if (this.loadingSubs) {
    //        this.loadingSubs.unsubscribe();
    //    }
    //}

}
