/// <reference types="@types/googlemaps" />
// import { } from 'googlemaps'

import { Injectable } from '@angular/core'

import { Observable } from 'rxjs'
import { NgZone } from '@angular/core'

import { MapsAPILoader } from '@agm/core'

import { AGM_STYLE } from '../misc/agm.style'

@Injectable()
export class MapsGoogleService {

	agm: any = {
		style: AGM_STYLE,
		drivemode: 'DRIVING'
	}

	constructor(
		private _mapsAPILoader: MapsAPILoader,
		private _ngZone: NgZone
	) { }

	initMap(MAP, PARAMS) {
		let options = {
			center: { lat: 32.832, lng: 34.983 },
			zoom: 16,
			disableDefaultUI: true,
			styles: this.agm.style
		}

		return new Promise((resolve, reject) => {
			this._mapsAPILoader
				.load()
				.then(() => resolve(new google.maps.Map(MAP, options)))
		})
	}

	_prepareAdress(place) {
		// console.log(place)
		let address: any = {}

		for (let _adr of place) {
			for (let _type of _adr.types) {

				if (_type === 'locality') {
					address.city = _adr.long_name
					break
				}
				if (_type === 'route') {
					address.street = _adr.long_name
					break
				}
				if (_type === 'street_number') {
					address.number = _adr.long_name
					break
				}
			}
		}

		return address
	}


	autocomplete(input_element, type) {
		return Observable.create(observer => {
			this._mapsAPILoader
				.load()
				.then(() => { ////////////////////////////////////////////////////////////////////////////////////////////
					let INPUT = new google.maps.places.Autocomplete(input_element)

					INPUT.addListener("place_changed", () => {
						this._ngZone.run(() => {
							let place__: google.maps.places.PlaceResult = INPUT.getPlace()

							if (place__.geometry === undefined || place__.geometry === null) return

							const ADRESS: any = this._prepareAdress(place__.address_components)

							let data = {
								city: ADRESS.city,
								street: ADRESS.street,
								number: ADRESS.number,
								lat: place__.geometry.location.lat(),
								lng: place__.geometry.location.lng()
							}

							observer.next(data)
							// observer.complete()
						})
					})
				})  //////////////////////////////////////////////////////////////////////////////////////////////////////
		})
	}

	gpsGetCenter(mode, COORDS) {
		// Локация своя
		if (mode === 'ME') {
			// GPS /////////////////////////////////////////////
			// if (!navigator.geolocation) {
			// 	alert('No geolocation available');
			// 	return;
			// }
			// else {
			// 	return new Promise((resolve, reject) => {
			// 		this.gps_id = navigator.geolocation.watchPosition(
			// 			(position) => {
			// 				navigator.geolocation.clearWatch(this.gps_id);
			// 				resolve({
			// 					lat: position.coords.latitude,
			// 					lng: position.coords.longitude
			// 				});
			// 			}),
			// 			(error) => {
			// 				reject(error);
			// 			}
			// 	})
			// }
			// GPS /////////////////////////////////////////////
		}

		let _center

		// Локация старта
		if (mode === 'O') _center = {
			lat: COORDS.OLAT,
			lng: COORDS.OLNG
		}

		if (mode === 'D') _center = {
			lat: COORDS.DLAT,
			lng: COORDS.DLNG
		}

		if (mode === 'R') _center = {
			lat: (COORDS.OLAT + COORDS.DLAT) / 2,
			lng: (COORDS.OLNG + COORDS.DLNG) / 2
		}

		if (mode === 'X') _center = {
			lat: COORDS.lat || 32.086,
			lng: COORDS.lng || 34.788
		}

		return Promise.resolve(_center)
	}

	centerMap(MAP, T, COORDS) {
		console.log(COORDS)
		let CENTER = { lat: COORDS.lat || 32.086, lng: COORDS.lng || 34.768 }

		this._mapsAPILoader
			.load()
			.then(() => {    // После этого рисуем его на карте

				let _map_options = {
					center: CENTER,
					zoom: 16,
					disableDefaultUI: true,
					styles: this.agm.style
					// mapTypeId: 'roadmap'
				}

				let _MAP = new google.maps.Map(MAP, _map_options)

				// if (T === 'R') {    // ОПЦИИ для маршрута
				// 	let bounds = new google.maps.LatLngBounds()
				// 		, loc = new google.maps.LatLng(center.lat, center.lng)

				// 	bounds.extend(loc)
				// 	_MAP.panToBounds(bounds)
				// 	_MAP.fitBounds(bounds)
				// }

				if (T !== 'R') {    // МАРКЕР для одиночной карты
					let marker = new google.maps.Marker({
						position: CENTER,
						map: _MAP,
						icon: {
							url: 'assets/i/marker41.png',
							size: new google.maps.Size(50, 50),
							origin: new google.maps.Point(0, 0),
							anchor: new google.maps.Point(25, 50)
						},
						animation: google.maps.Animation.DROP
					})
				}

				// РЕНДЕР КАРТЫ
				var directionsDisplay = new google.maps.DirectionsRenderer
				directionsDisplay.setMap(_MAP)
			})
	}

	showOnMap(map_element, mode, COORDS) {
		// return Observable.create(observer => {

		this.gpsGetCenter(mode, COORDS).then((center: any) => {    // Получаем центр

			this._mapsAPILoader
				.load()
				.then(() => {    // После этого рисуем его на карте

					let _map_options = {
						center: center,
						zoom: 16,
						disableDefaultUI: true,
						styles: this.agm.style
						// mapTypeId: 'roadmap'
					}

					let _MAP = new google.maps.Map(map_element, _map_options)

					if (mode === 'R') {    // ОПЦИИ для маршрута
						let bounds = new google.maps.LatLngBounds()
							, loc = new google.maps.LatLng(center.lat, center.lng)

						bounds.extend(loc)
						_MAP.panToBounds(bounds)
						_MAP.fitBounds(bounds)
					}

					if (mode !== 'R') {    // МАРКЕР для одиночной карты
						let marker = new google.maps.Marker({
							position: center,
							map: _MAP,
							icon: {
								url: 'assets/i/marker41.png',
								size: new google.maps.Size(50, 50),
								origin: new google.maps.Point(0, 0),
								anchor: new google.maps.Point(25, 50)
							},
							animation: google.maps.Animation.DROP
						})
					}

					// if (mode !== 'R') {  //////////////////////////////////////////////////////////////// DRAG
					// 	let self = this
					// 		, _MARKERS = []
					// 		, _canSearchFlag = false
					// 		, _idle = false

					// 	_MAP.addListener("dragstart", () => _idle = false)

					// 	_MAP.addListener("dragend", () => {

					// 		this._ngZone.run(() => {
					// 			observer.next('cansearch')
					// 			_canSearchFlag = true
					// 			_idle = true

					// 			setTimeout(() => {
					// 				if (_canSearchFlag && _idle) {

					// 					for (let M of _MARKERS) M.setMap(null)    /// Обнуляем маркеры
					// 					_MARKERS = []

					// 					let _DRAGCENTER = _MAP.getCenter()    /// Получаем центр карты
					// 						, _DRAGCOORDS = { lat: _DRAGCENTER.lat(), lng: _DRAGCENTER.lng() }

					// 						, _dragmarker = new google.maps.Marker({
					// 							position: _DRAGCOORDS,
					// 							map: _MAP,
					// 							icon: {
					// 								url: 'assets/i/pin.png',
					// 								size: new google.maps.Size(32, 32),
					// 								origin: new google.maps.Point(0, 0),
					// 								anchor: new google.maps.Point(16, 32)
					// 							},
					// 						})

					// 					_MARKERS.push(_dragmarker)

					// 					self.geocodeLatLng(_DRAGCOORDS).then(dragdata => {
					// 						_canSearchFlag = false
					// 						observer.next(dragdata)
					// 					})

					// 				}
					// 			}, 2500)

					// 		})  // zone

					// 	})
					// }  ////////////////////////////////////////////////////////////////////////////////// DRAG


					// РЕНДЕР КАРТЫ
					var directionsDisplay = new google.maps.DirectionsRenderer
					directionsDisplay.setMap(_MAP)

					if (mode === 'R') {    // Отображаем маршрут
						var directionsService = new google.maps.DirectionsService
						this.calculateAndDisplayRoute(directionsService, directionsDisplay, COORDS)
					}
				})

		})

		// })
	}

	calculateAndDisplayRoute(directionsService, directionsDisplay, COORDS) {
		const __options = {
			origin: { lat: COORDS.OLAT, lng: COORDS.OLNG },
			destination: { lat: COORDS.DLAT, lng: COORDS.DLNG },
			travelMode: this.agm.drivemode
		}

		directionsService.route(__options, (response, status) => {
			if (status == 'OK') directionsDisplay.setDirections(response)
			else window.alert('Directions request failed due to ' + status)
		})
	}


	distanceMatrix(COORDS) {
		return new Promise((resolve, reject) => {

			let __DMS: any = new google.maps.DistanceMatrixService()
			let __o = new google.maps.LatLng(COORDS.OLAT, COORDS.OLNG)
			let __d = new google.maps.LatLng(COORDS.DLAT, COORDS.DLNG)

			const __options = {
				origins: [__o],
				destinations: [__d],
				travelMode: this.agm.drivemode
			}

			__DMS.getDistanceMatrix(__options, (response, status) => {

				if (status == 'OK') {
					let _res = response.rows[0].elements[0]

					if (_res.status === 'ZERO_RESULTS') return resolve({ status: 'ZR' })

					let data = {
						distance: _res['distance']['value'] / 1000,
						time: _res['duration']['value'] / 60
					}

					return resolve(data)
				}
			})

		})
	}

	geocodeLatLng(dragcoords) {
		return new Promise((resolve, reject) => {

			let geocoder: any = new google.maps.Geocoder()
				, latlng = new google.maps.LatLng(dragcoords.lat, dragcoords.lng)

			geocoder.geocode({ 'latLng': latlng }, (results, status) => {
				if (status === google.maps.GeocoderStatus.OK)
					if (results[1]) {
						let ADRESS: any = this._prepareAdress(results[1].address_components)
							, data = {
								city: ADRESS.city,
								street: ADRESS.street,
								number: ADRESS.number,
								lat: dragcoords.lat,
								lng: dragcoords.lng
							}
						resolve(data)
					}

					else alert('No results found')
				else alert('Geocoder failed due to: ' + status)
			})

		})
	}

}

		////////////////////////////////////// DISTANCE MATRIX URL
		// const URL = `
		// https://maps.googleapis.com/maps/api/distancematrix/json
		// ?units=metric
		// &origins=32.32,34.34
		// &destinations=32.32,34.34
		// &key='key'
		// `
