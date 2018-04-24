import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    @Output() sidenavToggle = new EventEmitter<void>();
    isAuth$: Observable<boolean>;
    constructor(
        private authService: AuthService,
        private store: Store<fromRoot.State>
    ) { }

    ngOnInit() {
        this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    }

    onToggleSidenav() {
        this.sidenavToggle.emit();
    }

    onLogout() {
        this.authService.logout();
    }
}
