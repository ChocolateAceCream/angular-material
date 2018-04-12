import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor( private authService: AuthService) {}

    ngOnInit(){
        if (this.authService.isAuth()) {
            this.authService.authChange.next(true);
        } else {
            this.authService.authChange.next(false);
        }
    }

    title = 'app';
}
