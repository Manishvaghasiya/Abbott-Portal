import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({

    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule
    ]
})
export class SharedModule { }
