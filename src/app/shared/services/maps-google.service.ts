import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgZone } from '@angular/core';

import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';

import { AGM_STYLE } from '../misc/agm.style';
import { platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

@Injectable()
export class MapsGoogleService {

	agm: any = {
		style: AGM_STYLE
	}

	gps_id: any;
	gps_me: any = {
		lat: 0,
		lng: 0
	}

	_o_lat: any;
	_o_lng: any;
	_d_lat: any;
	_d_lng: any;
	_type: any;
	_distance: any;
	_time: any;

	constructor(
		private _mapsAPILoader: MapsAPILoader,
		private _ngZone: NgZone
	) { }

	// storeMapData(data) {
	// 	this._o_lat = data.o_lat;
	// 	this._o_lng = data.o_lng;
	// 	this._d_lat = data.d_lat;
	// 	this._d_lng = data.d_lng;
	// 	this._type = data.type;
	// }

	_prepareAdress(place) {
		console.log(place)
		let adress: any = {}

		for (let _adr of place) {
			for (let _type of _adr.types) {

				if (_type === 'locality') {
					adress.city = _adr.short_name
					break
				}
				if (_type === 'route') {
					adress.street = _adr.short_name
					break
				}
				if (_type === 'street_number') {
					adress.number = _adr.short_name
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
					//////////////////////////////////////
					let input__ = new google.maps.places.Autocomplete(input_element)

					input__.addListener("place_changed", () => {
						this._ngZone.run(() => {
							let place__: google.maps.places.PlaceResult = input__.getPlace()

							if (place__.geometry === undefined || place__.geometry === null) { return }

							// ADRESS ///////////////////////////////////////////////
							const adress: any = this._prepareAdress(place__.address_components)
							// ADRESS ///////////////////////////////////////////////

							let data = {
								city: adress.city,
								street: adress.street,
								number: adress.number,
								lat: place__.geometry.location.lat(),
								lng: place__.geometry.location.lng()
							}

							// SAVE LOCAL ////
							if (type === 'O') {
								this._o_lat = data.lat
								this._o_lng = data.lng
							}
							if (type === 'D') {
								this._d_lat = data.lat
								this._d_lng = data.lng
							}
							// SAVE LOCAL ////

							observer.next(data)
							// observer.complete()
						});
					});
					//////////////////////////////////////
				});
		});
	}

	gpsGetCenter(mode) {
		// Локация своя
		if (mode === 'ME') {
			// GPS /////////////////////////////////////////////
			if (!navigator.geolocation) {
				alert('No geolocation available');
				return;
			}
			else {
				return new Promise((resolve, reject) => {
					this.gps_id = navigator.geolocation.watchPosition(
						(position) => {
							navigator.geolocation.clearWatch(this.gps_id);
							resolve({
								lat: position.coords.latitude,
								lng: position.coords.longitude
							});
						}),
						(error) => {
							reject(error);
						}
				})
			}
			// GPS /////////////////////////////////////////////
		}

		// Локация старта
		if (mode === 'O') {
			return Promise.resolve({
				lat: this._o_lat,
				lng: this._o_lng
			})
		}

		if (mode === 'D') {
			return Promise.resolve({
				lat: this._d_lat,
				lng: this._d_lng
			})
		}

		if (mode === 'R') {
			return Promise.resolve({
				lat: (this._o_lat + this._d_lat) / 2,
				lng: (this._o_lng + this._d_lng) / 2
			})
		}

	}

	showOnMap(map_element, mode) {

		// Получаем центр
		this.gpsGetCenter(mode)
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
						// if (mode !== 'R') {
						// 	_map_options.center = center
						// }

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
								url: 'assets/i/marker40.png',
								size: new google.maps.Size(40, 40),
								origin: new google.maps.Point(0, 0),
								anchor: new google.maps.Point(20, 40)
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
							this.calculateAndDisplayRoute(directionsService, directionsDisplay);
						}
					});

			})

	}

	calculateAndDisplayRoute(directionsService, directionsDisplay) {
		const __options = {
			origin: { lat: this._o_lat, lng: this._o_lng },
			destination: { lat: this._d_lat, lng: this._d_lng },
			travelMode: 'DRIVING'
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


	distanceMatrix() {
		return new Promise((resolve, reject) => {

			let __DMS: any = new google.maps.DistanceMatrixService();
			let __o = new google.maps.LatLng(this._o_lat, this._o_lng);
			let __d = new google.maps.LatLng(this._d_lat, this._d_lng);

			const __options = {
				origins: [__o],
				destinations: [__d],
				travelMode: 'DRIVING',
			}

			__DMS.getDistanceMatrix(__options, (response, status) => {
				console.log(response)
				if (status == 'OK') {
					let data = {
						distance: response.rows[0].elements[0]['distance']['value'] / 1000,
						time: response.rows[0].elements[0]['duration']['value'] / 60
					}
					this._distance = data.distance;
					this._time = data.time;
					resolve(data)
				}
				else {
					reject(response)
				}
			}
			);

		})
	}

	// map(map_element) {
	// 	this._mapsAPILoader
	// 		.load()
	// 		.then(() => {

	// 			let m_lat = (this._o_lat + this._d_lat) / 2;
	// 			let m_lng = (this._o_lng + this._d_lng) / 2;

	// 			let _map = new google.maps.Map(
	// 				map_element,
	// 				{
	// 					zoom: 24,
	// 					center: { lat: m_lat, lng: m_lng }
	// 				}
	// 			);

	// 			var directionsDisplay = new google.maps.DirectionsRenderer;
	// 			var directionsService = new google.maps.DirectionsService;
	// 			directionsDisplay.setMap(_map);

	// 			this.calculateAndDisplayRoute(directionsService, directionsDisplay);
	// 		});
	// }


	// getRouteInfo() {
	// 	let res = {
	// 		distance: this._distance,
	// 		time: this._time
	// 	}
	// 	return res;
	// }

	// getWazeData() {
	// 	let res = {
	// 		d_lat: this._d_lat,
	// 		d_lng: this._d_lng
	// 	}
	// 	return res;
	// }

}
