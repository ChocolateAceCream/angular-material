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
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule,
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
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatCardModule,
        MatSnackBarModule,
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
        MatPaginatorModule,
        MatSidenavModule,
        MatToolbarModule,
        MatTableModule,
        MatSortModule,
        MatListModule,
        MatCardModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatInputModule
    ]
})
export class MaterialModule {}
