import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core'

import { LNG_PACK } from '../../models/LOCALIZATION'

import { MapsGoogleService } from '../../services/maps-google.service'

@Component({
	selector: 'gmap',
	templateUrl: './gmap.component.html',
	styleUrls: ['./gmap.component.sass']
})
export class GmapComponent implements OnInit {

	@Input() lng = undefined
	LNG = LNG_PACK

	@ViewChild('map') map: ElementRef

	showMode = {
		map: false,
		drag: false,
		dragLoading: false
	}

	address: any = {}

	constructor(
		private _maps: MapsGoogleService
	) { }

	ngOnInit() { }

	// window.navigator.geolocation.getCurrentPosition(function(e){console.log(e)})

	initMap(type, COORDS) {
		this._maps.showOnMap(this.map.nativeElement, type, COORDS)
			.subscribe(data => {
				if (data == 'cansearch') return this.showMode.dragLoading = true

				this.showMode.drag = true
				this.address = data
				this.showMode.dragLoading = false
			})
	}

	modalClick() {
		this.showMode.map = false
		this.showMode.drag = false
		this.address = {}
	}

	showMap(type, COORDS) {
		this.showMode.map = true
		if (this.map) this.initMap(type, COORDS)
		// setTimeout(() => { if (this.map) this.initMap(type, COORDS) }, 2000)
	}

	// showMe() {
	// 	this._maps.showOnMap(this.map.nativeElement, 'ME');
	// }

	getValue(F) {
		return this.address[F] || ''
	}

	addressValid() {
		if (this.address.city && this.address.street && this.address.number) return true
	}

}
