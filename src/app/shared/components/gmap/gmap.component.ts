import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, NgZone } from '@angular/core'
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

	@ViewChild('acinput') acinput: ElementRef
	@ViewChild('gmap') gmap: ElementRef
	map

	_MARKERS = {
		main: [],
		drag: []
	}
	_canSearchFlag = false
	_idle = false

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
		private _maps: MapsGoogleService,
		private _ngZone: NgZone
	) { }

	ngOnInit() {
		this.mapFormLoader()

		this._maps.initMap(this.gmap.nativeElement, null).then(map => {
			this.map = map

			this.map.addListener("dragstart", () => this._idle = false)

			this.map.addListener('dragend', () => {

				this._ngZone.run(() => {

					this.showMode.dragLoading = true
					this._canSearchFlag = true
					this._idle = true

					setTimeout(() => {
						if (this._canSearchFlag && this._idle) {

							for (let M of this._MARKERS.drag) M.setMap(null)    /// Обнуляем маркеры
							this._MARKERS.drag = []

							let _DRAGCENTER = this.map.getCenter()
								, _DRAGCOORDS = { lat: _DRAGCENTER.lat(), lng: _DRAGCENTER.lng() }

								, _dragmarker = new google.maps.Marker({
									position: _DRAGCOORDS,
									map: this.map,
									icon: {
										url: 'assets/i/pin.png',
										size: new google.maps.Size(32, 32),
										origin: new google.maps.Point(0, 0),
										anchor: new google.maps.Point(16, 32)
									},
								})

							this._MARKERS.drag.push(_dragmarker)

							this._maps.geocodeLatLng(_DRAGCOORDS).then(result => {
								this.address = result
								this._canSearchFlag = false
								this.showMode.dragLoading = false
							})

						}
					}, 1800)
				})

			})  //  DragEnd
		})
	}

	// mapReady(map) {
	// 	let this = this
	// 	this.map = map

	// 	this.map.addListener('dragend', (e) => {
	// 		console.log(this.map.getCenter())
	// 	})
	// }

	// evDragEnd(e) {
	// 	console.log(e)
	// }

	close() {
		this.cleanMarkers()

		this.showMode.map = false
		this.showMode.drag = false
		this.address = {}

		this.setInputValue(false, null)
	}

	mapFormLoader() {   // Initialize search elements for MapAPI
		this._maps.autocomplete(this.acinput.nativeElement, 'X')
			.subscribe(data => {
				this.address = data
				this.centerMap(data)
			})
	}


	selectLocation(T, INFO) {
		this.T = T
		this.address = INFO
		this.setInputValue(true, INFO)

		// console.log(window.navigator)
		// this.centerMap({ lat: INFO.lat || 32.422, lng: INFO.lng || 34.875 })
		if (this.addressValid()) this.centerMap({ lat: this.address.lat, lng: this.address.lng })
		else this.myLocation()
		this.showMode.map = true

		// this._maps.showOnMap(this.map.nativeElement, 'X', this.address)
		// 	.subscribe(data => {
		// 		if (data == 'cansearch') return this.showMode.dragLoading = true

		// 		this.showMode.drag = true
		// 		this.address = data
		// 		this.showMode.dragLoading = false
		// 	})
	}

	myLocation() {
		this.cleanMarkers()
		window.navigator.geolocation.getCurrentPosition(
			(e) => {
				let COORDS = { lat: e.coords.latitude, lng: e.coords.longitude }
				this.centerMap(COORDS)
			},
			(error) => {
				this.centerMap({ lat: 32.0858, lng: 34.7878 })
				if (error.code == error.PERMISSION_DENIED) alert(error.code)
				console.log(error)
			}
		)
	}

	centerMap(data) {
		let center = { lat: data.lat, lng: data.lng }
			, marker = new google.maps.Marker({
				position: center,
				map: this.map,
				icon: {
					url: 'assets/i/marker41.png',
					size: new google.maps.Size(50, 50),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(25, 50)
				},
				animation: google.maps.Animation.DROP
			})

		this._MARKERS.main.push(marker)
		this.map.setCenter(center)
	}

	cleanMarkers() {
		for (let MM of this._MARKERS.main) MM.setMap(null)    /// Обнуляем маркеры
		this._MARKERS.main = []
		for (let DM of this._MARKERS.drag) DM.setMap(null)
		this._MARKERS.drag = []
	}

	setInputValue(F, INFO) {
		let A = INFO
		if (!F) return this.acinput.nativeElement.value = ''

		else this.acinput.nativeElement.value = (A.street ? A.street + ' ' : '') + (A.number ? A.number + ', ' : '') + (A.city ? A.city : '')
	}

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
