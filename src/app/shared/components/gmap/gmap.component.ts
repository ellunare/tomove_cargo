import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core'
import { LNG_PACK } from '../../models/LOCALIZATION'

import { MapsGoogleService } from '../../services/maps-google.service'

// import { Subject, Observable } from 'rxjs'

// import { Subject } from "rxjs"
// import { takeUntil } from 'rxjs/operators'

@Component({
	selector: 'gmap',
	templateUrl: './gmap.component.html',
	styleUrls: ['./gmap.component.sass']
})
export class GmapComponent implements OnInit {

	@Input() lng = undefined
	LNG = LNG_PACK

	@ViewChild('map') map: ElementRef
	@ViewChild('acinput') acinput: ElementRef

	showMode = {
		map: false,
		drag: false,
		dragLoading: false
	}

	T
	address: any = {}

	// private ngUnsubscribe: Subject<void> = new Subject<void>()

	@Output() outLocationSelected = new EventEmitter()

	constructor(
		private _maps: MapsGoogleService
	) { }

	ngOnInit() {
		this.mapFormLoader()
	}

	close() {
		this.showMode.map = false
		this.showMode.drag = false
		this.address = {}
		this.setInputValue(false, null)
	}

	mapFormLoader() {   // Initialize search elements for MapAPI
		this._maps.autocomplete(this.acinput.nativeElement, 'X')
			.subscribe(data => {
				this.address = data
				this.centerMap()
			})
	}


	selectLocation(T, INFO) {
		this.T = T
		this.address = INFO
		this.setInputValue(true, INFO)
		this.showMode.map = true

		this._maps.showOnMap(this.map.nativeElement, 'X', this.address)
			.subscribe(data => {
				if (data == 'cansearch') return this.showMode.dragLoading = true

				this.showMode.drag = true
				this.address = data
				this.showMode.dragLoading = false
			})
	}

	setInputValue(F, INFO) {
		let A = INFO
		if (!F) return this.acinput.nativeElement.value = ''

		else this.acinput.nativeElement.value = (A.street ? A.street + ' ' : '') + (A.number ? A.number + ', ' : '') + (A.city ? A.city : '')
	}

	centerMap() {
		this._maps.centerMap(this.map.nativeElement, 'X', this.address)
	}

	// window.navigator.geolocation.getCurrentPosition(function(e){console.log(e)})


	////////////////////////////////////////////////////////// LEGACY
	// initMap(type, COORDS) {
	// 	this._maps.showOnMap(this.map.nativeElement, type, COORDS)
	// 		.subscribe(data => {
	// 			if (data == 'cansearch') return this.showMode.dragLoading = true

	// 			this.showMode.drag = true
	// 			this.address = data
	// 			this.showMode.dragLoading = false
	// 		})
	// }

	// showMap(type, COORDS) {
	// 	this.showMode.map = true
	// 	if (this.map) this.initMap(type, COORDS)
	// }
	////////////////////////////////////////////////////////// LEGACY

	showInfo() {
		if (this.address.city || this.address.street || this.address.number) return true
	}

	getValue(F) {
		return this.address[F] || ''
	}

	addressValid() {
		if (this.address.city && this.address.street && this.address.number) return true
	}

	// showMe() {
	// 	this._maps.showOnMap(this.map.nativeElement, 'ME');
	// }


	onLocationSelected() {
		let SEND = {
			T: this.T,
			info: JSON.parse(JSON.stringify(this.address))
		}
		this.outLocationSelected.emit(SEND)
		this.close()
	}


	ngOnDestroy() {    //This is where we close any active subscription
		// this.ngUnsubscribe.next()
		// this.ngUnsubscribe.complete()
	}

}
