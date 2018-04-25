import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from'../../shared/ui.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    maxDate;
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

        this.maxDate = new Date();;
        this.maxDate.setFullYear(this.maxDate.getFullYear() - 18 );

    }

    onSubmit(form: NgForm){
        this.authService.registerUser({
            email: form.value.email,
            password: form.value.password
        });
    }

}
