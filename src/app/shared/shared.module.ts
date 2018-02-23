import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CONFIG } from '../../environments/config';
import { AgmCoreModule } from '@agm/core';
import { MapsGoogleService } from './services/maps-google.service';

import { TimePickerComponent } from './components/time-picker/time-picker.component'
import { DatePickerComponent } from './components/date-picker/date-picker.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: CONFIG.googleMapsKey,
      libraries: ["places"]
    }),
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
  ],
  providers: [
    MapsGoogleService
  ]
})
export class SharedModule { }
