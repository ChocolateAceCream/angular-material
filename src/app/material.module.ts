import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatTabsModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatCardModule,
    MatToolbarModule,
    MatListModule,
    MatDialogModule,
    MatInputModule
} from '@angular/material';
@NgModule({
    imports: [
        MatButtonModule,
        MatSelectModule,
        MatDatepickerModule,
        MatTabsModule,
        MatNativeDateModule,
        MatSidenavModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatToolbarModule,
        MatSidenavModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatListModule,
        MatCheckboxModule
    ],
    exports: [
        MatButtonModule,
        MatTabsModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatIconModule,
        MatFormFieldModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatInputModule
    ]
})
export class MaterialModule {}
