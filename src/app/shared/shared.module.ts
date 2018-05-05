import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CONFIG } from '../../environments/config';
import { AgmCoreModule } from '@agm/core';
import { MapsGoogleService } from './services/maps-google.service';

import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { TimePickerComponent } from './components/time-picker/time-picker.component'
import { ItemPickerComponent } from './components/item-picker/item-picker.component';
import { GmapComponent } from './components/gmap/gmap.component';


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
		ItemPickerComponent,
		GmapComponent
	],
	declarations: [
		TimePickerComponent,
		DatePickerComponent,
		ItemPickerComponent,
		GmapComponent
	],
	providers: [
		MapsGoogleService
	]
})
export class SharedModule { }
