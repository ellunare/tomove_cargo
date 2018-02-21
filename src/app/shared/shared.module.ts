import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TimePickerComponent } from './components/time-picker/time-picker.component'
import { DatePickerComponent } from './components/date-picker/date-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    TimePickerComponent,
    DatePickerComponent
  ],
  declarations: [
    TimePickerComponent, 
    DatePickerComponent
  ]
})
export class SharedModule { }
