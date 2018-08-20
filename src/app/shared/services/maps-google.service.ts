import { Injectable } from '@angular/core'

import { Observable } from 'rxjs/Observable'
import { NgZone } from '@angular/core'

import { MapsAPILoader } from '@agm/core'
import { } from 'googlemaps'

import { AGM_STYLE } from '../misc/agm.style'
// import { platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing'

@Injectable()
export class MapsGoogleService {

	agm: any = {
		style: AGM_STYLE
	}

	gps_id: any
	// gps_me: any = {
	// 	lat: 0,
	// 	lng: 0
	// }

	drivemode: string = 'DRIVING'

	constructor(
		private _mapsAPILoader: MapsAPILoader,
		private _ngZone: NgZone
	) { }

	_prepareAdress(place) {
		console.log(place)
		let adress: any = {}

		for (let _adr of place) {
			for (let _type of _adr.types) {

				if (_type === 'locality') {
					adress.city = _adr.long_name
					break
				}
				if (_type === 'route') {
					adress.street = _adr.long_name
					break
				}
				if (_type === 'street_number') {
					adress.number = _adr.long_name
					break
				}
			}
		}

		return adress
	}


	autocomplete(input_element, type) {
		return Observable.create(observer => {
			this._mapsAPILoader
				.load()
				.then(() => {
					//////////////////////////////////////////////////////////////////////////////////////////////////////
					let input__ = new google.maps.places.Autocomplete(input_element)

					input__.addListener("place_changed", () => {
						this._ngZone.run(() => {
							let place__: google.maps.places.PlaceResult = input__.getPlace()

							if (place__.geometry === undefined || place__.geometry === null) { return }

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
					//////////////////////////////////////////////////////////////////////////////////////////////////////
				})
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

		// Локация старта
		if (mode === 'O') {
			return Promise.resolve({
				lat: COORDS.OLAT,
				lng: COORDS.OLNG
			})
		}

		if (mode === 'D') {
			return Promise.resolve({
				lat: COORDS.DLAT,
				lng: COORDS.DLNG
			})
		}

		if (mode === 'R') {
			return Promise.resolve({
				lat: (COORDS.OLAT + COORDS.DLAT) / 2,
				lng: (COORDS.OLNG + COORDS.DLNG) / 2
			})
		}

	}

	showOnMap(map_element, mode, COORDS) {

		// Получаем центр
		this.gpsGetCenter(mode, COORDS)
			.then((center: any) => {

				// После этого рисуем его на карте
				this._mapsAPILoader
					.load()
					.then(() => {

						let _map_options = {
							// mapTypeId: 'roadmap',
							center: center,
							zoom: 16,
							disableDefaultUI: true,
							styles: this.agm.style
						}

						// ОПЦИИ для одиночной карты
						if (mode !== 'R') {
							_map_options.center = center
						}

						let _map = new google.maps.Map(map_element, _map_options);

						// ОПЦИИ для маршрута
						if (mode === 'R') {
							let bounds = new google.maps.LatLngBounds();
							let loc = new google.maps.LatLng(center.lat, center.lng);
							bounds.extend(loc);

							_map.panToBounds(bounds);
							_map.fitBounds(bounds);
						}

						// МАРКЕР для одиночной карты
						if (mode !== 'R') {
							const marker_img = {
								url: 'assets/i/marker41.png',
								size: new google.maps.Size(50, 50),
								origin: new google.maps.Point(0, 0),
								anchor: new google.maps.Point(25, 50)
							};
							var marker = new google.maps.Marker({
								position: center,
								map: _map,
								icon: marker_img,
								animation: google.maps.Animation.DROP
							});
						}

						// РЕНДЕР КАРТЫ
						var directionsDisplay = new google.maps.DirectionsRenderer;
						directionsDisplay.setMap(_map);

						if (mode === 'R') {
							var directionsService = new google.maps.DirectionsService;
							this.calculateAndDisplayRoute(directionsService, directionsDisplay, COORDS);
						}
					});

			})

	}

	calculateAndDisplayRoute(directionsService, directionsDisplay, COORDS) {
		const __options = {
			origin: { lat: COORDS.OLAT, lng: COORDS.OLNG },
			destination: { lat: COORDS.DLAT, lng: COORDS.DLNG },
			travelMode: this.drivemode
		}

		directionsService.route(__options, (response, status) => {
			if (status == 'OK') {
				directionsDisplay.setDirections(response);
			}
			else {
				window.alert('Directions request failed due to ' + status);
			}
		});
	}


	distanceMatrix(COORDS) {
		return new Promise((resolve, reject) => {

			let __DMS: any = new google.maps.DistanceMatrixService()
			let __o = new google.maps.LatLng(COORDS.OLAT, COORDS.OLNG)
			let __d = new google.maps.LatLng(COORDS.DLAT, COORDS.DLNG)

			const __options = {
				origins: [__o],
				destinations: [__d],
				travelMode: this.drivemode
			}

			__DMS.getDistanceMatrix(__options, (response, status) => {

				if (status == 'OK') {
					let _res = response.rows[0].elements[0]

					if (_res.status === 'ZERO_RESULTS') {
						resolve({ status: 'ZR' })
						return
					}

					let data = {
						distance: _res['distance']['value'] / 1000,
						time: _res['duration']['value'] / 60
					}

					resolve(data)
				}
			}
			)

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
