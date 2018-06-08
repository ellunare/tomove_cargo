import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { MapsGoogleService } from '../../services/maps-google.service';

@Component({
	selector: 'gmap',
	templateUrl: './gmap.component.html',
	styleUrls: ['./gmap.component.sass']
})
export class GmapComponent implements OnInit {

	@ViewChild('map') map: ElementRef;

	showMode = {
		map: false,
		// O: false,
		// D: false
	}

	constructor(
		private _maps: MapsGoogleService
	) { }

	ngOnInit() { }

	initMap(type) {
		this._maps.showOnMap(this.map.nativeElement, type);
	}

	modalClick(e) {
		this.showMode.map = false;
	}

	showMap(type) {
		this.showMode.map = true;
		setTimeout(() => {
			if (this.map) {
				this.initMap(type);
			}
		}, 1000);
	}

	showMe() {
		this._maps.showOnMap(this.map.nativeElement, 'ME');
	}

}
