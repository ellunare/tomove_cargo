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
		map: false
	}

	constructor(
		private _maps: MapsGoogleService
	) { }

	ngOnInit() { }

	initMap(type, COORDS) {
		this._maps.showOnMap(this.map.nativeElement, type, COORDS)
	}

	modalClick() {
		this.showMode.map = false
	}

	showMap(type, COORDS) {
		this.showMode.map = true
		setTimeout(() => { if (this.map) this.initMap(type, COORDS) }, 1000)
	}

	// showMe() {
	// 	this._maps.showOnMap(this.map.nativeElement, 'ME');
	// }

}
