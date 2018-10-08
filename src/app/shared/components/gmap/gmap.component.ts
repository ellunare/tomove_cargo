import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, NgZone } from '@angular/core'
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

	@ViewChild('acinput') acinput: ElementRef
	@ViewChild('gmap') gmap: ElementRef
	map

	_MARKERS = {
		main: [],
		drag: []
	}
	_canSearchFlag = false
	_idle = false

	gps_access = true

	showMode = {
		map: false,
		drag: false,
		dragLoading: false,
		onlyRoute: false
	}

	T
	address: any = {}

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

							// this.cleanMarkers()

							let _DRAGCENTER = this.map.getCenter()
								, _DRAGCOORDS = { lat: _DRAGCENTER.lat(), lng: _DRAGCENTER.lng() }

							// 	, _dragmarker = new google.maps.Marker({
							// 		position: _DRAGCOORDS,
							// 		map: this.map,
							// 		icon: {
							// 			url: 'assets/i/pin.png',
							// 			size: new google.maps.Size(32, 32),
							// 			origin: new google.maps.Point(0, 0),
							// 			anchor: new google.maps.Point(16, 32)
							// 		},
							// 	})

							// this._MARKERS.drag.push(_dragmarker)

							return this.geocode(_DRAGCOORDS)

						}
					}, 1800)
				})

			})  //  DragEnd
		})

		this.gps_access = true
	}

	close() {
		// this.cleanMarkers()

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

		if (this.addressValid()) this.centerMap({ lat: INFO.lat, lng: INFO.lng })
		else this.myLocation()
		this.showMode.map = true
	}

	geocode(COORDS) {
		this._maps.geocodeLatLng(COORDS).then(result => {
			this.address = result
			this._canSearchFlag = false
			this.showMode.dragLoading = false
		})
	}

	myLocation() {
		// this.cleanMarkers()
		window.navigator.geolocation.getCurrentPosition(
			(e) => {
				let COORDS = { lat: e.coords.latitude, lng: e.coords.longitude }
				this.geocode(COORDS)
				this.centerMap(COORDS)
			},
			(error) => {
				this.centerMap({ lat: 32.0858, lng: 34.7878 })
				this.gps_access = false
				console.log(error)
				// if (error.code == error.PERMISSION_DENIED) 
			}
		)
	}

	centerMap(data) {    //  Показываем адрес на карте и ставим маркер
		let center = { lat: data.lat, lng: data.lng }
		// 	, marker = new google.maps.Marker({
		// 		position: center,
		// 		map: this.map,
		// 		icon: {
		// 			url: 'assets/i/marker41.png',
		// 			size: new google.maps.Size(50, 50),
		// 			origin: new google.maps.Point(0, 0),
		// 			anchor: new google.maps.Point(25, 50)
		// 		},
		// 		animation: google.maps.Animation.DROP
		// 	})

		// this._MARKERS.main.push(marker)
		this.map.setCenter(center)
	}

	// cleanMarkers() {    /// Обнуляем маркеры
	// 	for (let MM of this._MARKERS.main) MM.setMap(null)
	// 	this._MARKERS.main = []
	// 	for (let DM of this._MARKERS.drag) DM.setMap(null)
	// 	this._MARKERS.drag = []
	// }

	setInputValue(F, INFO) {
		let A = INFO
		if (!F) return this.acinput.nativeElement.value = ''

		else this.acinput.nativeElement.value = (A.street ? A.street + ' ' : '') + (A.number ? A.number + ', ' : '') + (A.city ? A.city : '')
	}

	// canEraseInput() {
	// 	// if (this.acinput.nativeElement.value.length) return true
	// 	return false
	// }

	showInfo() {
		if (this.address.city || this.address.street || this.address.number) return true
	}

	getValue(F) {
		return this.address[F] || ''
	}

	addressValid() {
		if (this.address.city && this.address.street && this.address.number) return true
	}

	onLocationSelected() {
		let SEND = {
			T: this.T,
			info: JSON.parse(JSON.stringify(this.address))
		}
		this.outLocationSelected.emit(SEND)
		this.close()
	}

	////////////////////////////////////////////////////////// LEGACY // Для VR
	initMap(type, COORDS) {
		this._maps.showOnMap(this.gmap.nativeElement, type, COORDS)
	}

	showRouteMap(type, COORDS) {
		this.showMode.onlyRoute = true
		this.showMode.map = true
		if (this.map) this.initMap(type, COORDS)
	}
	////////////////////////////////////////////////////////// LEGACY

}
