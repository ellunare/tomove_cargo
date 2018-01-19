import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { NgZone } from '@angular/core';

import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';

@Injectable()
export class MapsGoogleService {

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

  storeMapData(data) {
    this._o_lat = data.o_lat;
    this._o_lng = data.o_lng;
    this._d_lat = data.d_lat;
    this._d_lng = data.d_lng;
    this._type = data.type;
  }

  autocomplite(input_element) {
    let _observable = Observable.create(observer => {
      this._mapsAPILoader.load().then(
        () => {
          //////////////////////////////////////
          let input__ = new google.maps.places.Autocomplete(input_element);
          input__.addListener("place_changed", () => {
            this._ngZone.run(() => {
              let place__: google.maps.places.PlaceResult = input__.getPlace();
              if (place__.geometry === undefined || place__.geometry === null) {
                return;
              }
              let data = {
                _lat: place__.geometry.location.lat(),
                _lng: place__.geometry.location.lng()
              }
              observer.next(data);
              // observer.complete();
            });
          });
          //////////////////////////////////////
        });
    });
    return _observable;
  }

  distanceMatrix() {
    let _observable = Observable.create(observer => {

      let service__: any = new google.maps.DistanceMatrixService();
      let __o = new google.maps.LatLng(this._o_lat, this._o_lng);
      let __d = new google.maps.LatLng(this._d_lat, this._d_lng);

      service__.getDistanceMatrix(
        {
          origins: [__o],
          destinations: [__d],
          travelMode: this._type.toUpperCase(),
        },
        (responce, status) => {
          if (status == 'OK') {
            let data = {
              distance: responce.rows[0].elements[0].distance.value / 1000,
              time: responce.rows[0].elements[0].duration.value / 60
            }
            this._distance = data.distance;
            this._time = data.time;
            observer.next(data);
          }
        }
      );

    });
    return _observable;
  }

  map(map_element) {
    this._mapsAPILoader.load().then(
      () => {

        let m_lat = (this._o_lat + this._d_lat) / 2;
        let m_lng = (this._o_lng + this._d_lng) / 2;

        let _map = new google.maps.Map(
          map_element,
          {
            zoom: 24,
            center: { lat: m_lat, lng: m_lng }
          }
        );

        var directionsDisplay = new google.maps.DirectionsRenderer;
        var directionsService = new google.maps.DirectionsService;
        directionsDisplay.setMap(_map);

        this.calculateAndDisplayRoute(directionsService, directionsDisplay);
      });
  }

  calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route(
      {
        origin: { lat: this._o_lat, lng: this._o_lng },
        destination: { lat: this._d_lat, lng: this._d_lng },
        travelMode: this._type.toUpperCase()
      },
      function (response, status) {
        if (status == 'OK') {
          directionsDisplay.setDirections(response);
        }
        else {
          window.alert('Directions request failed due to ' + status);
        }
      });
  }

  getRouteInfo() {
    let res = {
      distance: this._distance,
      time: this._time
    }
    return res;
  }

  getWazeData() {
    let res = {
      d_lat: this._d_lat,
      d_lng: this._d_lng
    }
    return res;
  }

}
