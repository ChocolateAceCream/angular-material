import { Component, OnDestroy, EventEmitter, Output, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-sidenav-list',
    templateUrl: './sidenav-list.component.html',
    styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

    @Output()  closeSidenav = new EventEmitter<void>();
    isAuth: boolean = false;
    authSubscription: Subscription;
    constructor( private authService: AuthService) { }

    ngOnInit() {
        this.authSubscription = this.authService.authChange.subscribe(authStatus => {
          this.isAuth = authStatus;
        });
    }

    onClose() {
        this.closeSidenav.emit();
    }

    onLogout() {
        this.onClose();
        this.authService.logout();
    }
    ngOnDestroy() {
        this.authSubscription.unsubscribe();
    }

}
