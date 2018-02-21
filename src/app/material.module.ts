import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatIconModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatInputModule
} from '@angular/material';
@NgModule({
    imports: [
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSidenavModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatCheckboxModule
    ],
    exports: [
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatIconModule,
        MatFormFieldModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatInputModule
    ]
})
export class MaterialModule {}
