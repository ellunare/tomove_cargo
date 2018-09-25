import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

import { CONFIG } from '../../environments/config'
import { AgmCoreModule } from '@agm/core'

import { MapsGoogleService } from './services/maps-google.service'
import { CanvasService } from './services/canvas.service'
import { RequestService } from './services/request.service'
import { REQResolver } from './services/req.resolver'

import { PlaceInfoComponent } from './components/place-info/place-info.component'
import { DatePickerComponent } from './components/date-picker/date-picker.component'
import { TimePickerComponent } from './components/time-picker/time-picker.component'
import { ItemPickerComponent } from './components/item-picker/item-picker.component'
import { ItemEditorComponent } from './components/item-editor/item-editor.component'
import { GmapComponent } from './components/gmap/gmap.component'


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		// ReactiveFormsModule,
		AgmCoreModule.forRoot({
			apiKey: CONFIG.googleMapsKey,
			libraries: ["places"],
			language: 'en'
		}),
	],
	exports: [
		FormsModule,
		// ReactiveFormsModule,
		PlaceInfoComponent,
		DatePickerComponent,
		TimePickerComponent,
		ItemPickerComponent,
		ItemEditorComponent,
		GmapComponent
	],
	declarations: [
		PlaceInfoComponent,
		TimePickerComponent,
		DatePickerComponent,
		ItemPickerComponent,
		ItemEditorComponent,
		GmapComponent
	],
	providers: [
		MapsGoogleService,
		RequestService,
		REQResolver,
		CanvasService
	]
})
export class SharedModule { }
