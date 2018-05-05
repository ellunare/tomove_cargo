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
	// gps_me_render = false;

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
	) {
		console.log(this.gps_me)
	}

	storeMapData(data) {
		this._o_lat = data.o_lat;
		this._o_lng = data.o_lng;
		this._d_lat = data.d_lat;
		this._d_lng = data.d_lng;
		this._type = data.type;
	}

	autocomplete(input_element) {
		return Observable.create(observer => {
			this._mapsAPILoader
				.load()
				.then(() => {
					//////////////////////////////////////
					let input__ = new google.maps.places.Autocomplete(input_element);
					input__.addListener("place_changed", () => {
						this._ngZone.run(() => {
							let place__: google.maps.places.PlaceResult = input__.getPlace();
							if (place__.geometry === undefined || place__.geometry === null) {
								return;
							}
							let data = {
								lat: place__.geometry.location.lat(),
								lng: place__.geometry.location.lng()
							}

							// DELETE
							this._o_lat = data.lat;
							this._o_lng = data.lng;
							// 


							observer.next(data);
							// observer.complete();
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
	}

	showOnMap(map_element, mode) {

		this.gpsGetCenter(mode)
			.then((center: any) => {
				console.log(center);

				this._mapsAPILoader
					.load()
					.then(() => {

						let _map = new google.maps.Map(map_element,
							{
								center: center,
								zoom: 16,
								disableDefaultUI: true,
								// mapTypeId: 'roadmap',
								styles: this.agm.style
							}
						);

						const marker_img = {
							url: 'assets/i/marker.svg',
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

						var directionsDisplay = new google.maps.DirectionsRenderer;
						directionsDisplay.setMap(_map);

						// var directionsService = new google.maps.DirectionsService;
						// this.calculateAndDisplayRoute(directionsService, directionsDisplay);
					});


			})

	}

	// distanceMatrix() {
	// 	return Observable.create(observer => {

	// 		let service__: any = new google.maps.DistanceMatrixService();
	// 		let __o = new google.maps.LatLng(this._o_lat, this._o_lng);
	// 		let __d = new google.maps.LatLng(this._d_lat, this._d_lng);

	// 		service__.getDistanceMatrix(
	// 			{
	// 				origins: [__o],
	// 				destinations: [__d],
	// 				travelMode: this._type.toUpperCase(),
	// 			},
	// 			(response, status) => {
	// 				if (status == 'OK') {
	// 					let data = {
	// 						distance: response.rows[0].elements[0].distance.value / 1000,
	// 						time: response.rows[0].elements[0].duration.value / 60
	// 					}
	// 					this._distance = data.distance;
	// 					this._time = data.time;
	// 					observer.next(data);
	// 					observer.complete();
	// 				}
	// 			}
	// 		);

	// 	});
	// }

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

	// calculateAndDisplayRoute(directionsService, directionsDisplay) {
	// 	directionsService.route(
	// 		{
	// 			origin: { lat: this._o_lat, lng: this._o_lng },
	// 			destination: { lat: this._d_lat, lng: this._d_lng },
	// 			travelMode: this._type.toUpperCase()
	// 		},
	// 		(response, status) => {
	// 			if (status == 'OK') {
	// 				directionsDisplay.setDirections(response);
	// 			}
	// 			else {
	// 				window.alert('Directions request failed due to ' + status);
	// 			}
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
