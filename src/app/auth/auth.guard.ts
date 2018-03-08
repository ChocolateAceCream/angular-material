import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
//Canactivate is an interface, which must provide a canActive method

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //must return a boolean or promise or observable
        if(this.authService.isAuth()) {
            return true;
        } else {
            this.router.navigate(['/login']);

        }
    }
}
//apend this to a routing
