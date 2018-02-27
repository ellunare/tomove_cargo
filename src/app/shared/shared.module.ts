import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CONFIG } from '../../environments/config';
import { AgmCoreModule } from '@agm/core';
import { MapsGoogleService } from './services/maps-google.service';

import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { TimePickerComponent } from './components/time-picker/time-picker.component'
import { ItemPickerComponent } from './components/item-picker/item-picker.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: CONFIG.googleMapsKey,
      libraries: ["places"]
    }),
  ],
  exports: [
    FormsModule,
    // ReactiveFormsModule,
    DatePickerComponent,
    TimePickerComponent,
    ItemPickerComponent
  ],
  declarations: [
    TimePickerComponent,
    DatePickerComponent,
    ItemPickerComponent
  ],
  providers: [
    MapsGoogleService
  ]
})
export class SharedModule { }
