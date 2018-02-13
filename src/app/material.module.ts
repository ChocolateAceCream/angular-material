import { NgModule } from '@angular/core';
import { MatButtonModule,MatNativeDateModule, MatDatepickerModule, MatIconModule, MatFormFieldModule, MatInputModule } from '@angular/material';
@NgModule({
    imports: [
        MatButtonModule,MatDatepickerModule,MatNativeDateModule,
        MatIconModule, MatFormFieldModule, MatInputModule
    ],
    exports: [
        MatButtonModule,MatDatepickerModule,MatNativeDateModule,
        MatIconModule, MatFormFieldModule, MatInputModule
    ]
})
export class MaterialModule {}
