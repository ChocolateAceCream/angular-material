import { NgModule } from '@angular/core';
import { MatButtonModule,MatNativeDateModule,MatCheckboxModule, MatDatepickerModule, MatIconModule, MatFormFieldModule, MatInputModule } from '@angular/material';
@NgModule({
    imports: [
        MatButtonModule,MatDatepickerModule,MatNativeDateModule,
        MatIconModule, MatFormFieldModule, MatInputModule,MatCheckboxModule
    ],
    exports: [
        MatButtonModule,MatDatepickerModule,MatNativeDateModule,MatCheckboxModule,
        MatIconModule, MatFormFieldModule, MatInputModule
    ]
})
export class MaterialModule {}
