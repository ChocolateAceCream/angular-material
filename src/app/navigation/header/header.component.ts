import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    @Output() sidenavToggle = new EventEmitter<void>();
    constructor() { }

    ngOnInit() {
    }

    onToggleSidenav() {
        this.sidenavToggle.emit();
    }
}
