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
    MatTableModule,
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
        MatTableModule,
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
        MatTableModule,
        MatListModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatInputModule
    ]
})
export class MaterialModule {}
