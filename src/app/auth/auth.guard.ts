import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import * as fromRoot from '../app.reducer';
import { Injectable } from '@angular/core';
//Canactivate is an interface, which must provide a canActive method

@Injectable()
export class AuthGuard implements CanActivate {
    isAuth$: boolean;
    constructor(
        private store: Store<fromRoot.State>,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //this will return a observable
        //since the value of observable changes, but router guard only run once,
        //so we append take(1) method to run the guard every time when value
        //change happened
        this.store.select(fromRoot.getIsAuth).pipe(take(1)).subscribe((isAuth: boolean) => {
            this.isAuth$ = isAuth;
        });
        if (this.isAuth$) {
            return true;
        } else {
            this.router.navigate(['/login']);
        }

        //    //must return a boolean or promise or observable
        //    if(this.authService.isAuth()) {
        //        return true;
        //    } else {
        //        this.router.navigate(['/login']);

        //    }
    }
}
//apend this to a routing
