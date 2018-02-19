import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';

import { MapsGoogleService } from '../../shared/services/maps-google.service';

import { APPARTMENT_TYPES } from '../../shared/models/APPARTMENT_TYPES';

@Component({
  selector: 'request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.sass']
})
export class RequestComponent implements OnInit {

  place_types = APPARTMENT_TYPES;
  place: string;

  @ViewChild('search_O') public search_O: ElementRef;
  @ViewChild('search_D') public search_D: ElementRef;
  
  o_lat: number;
  o_lng: number;
  d_lat: number;
  d_lng: number;
  type: any = 'driving';
  distance: number;
  time: number;
  
  @ViewChild('floor_O') public floor_O: ElementRef;
  @ViewChild('floor_D') public floor_D: ElementRef;

  o_floor: number;
  d_floor: number;

  floors = [];

  constructor(
    private _maps: MapsGoogleService
  ) { }

  ngOnInit() {
    this.initFloors();
    this.mapFormLoader();
  }

  initFloors() {
    const floorsMax = 20;
    for (let i = 1; i <= floorsMax; i++) {
      this.floors.push(i);
    }
  }

  onAppartmentSelect() {
    console.log(this.place.toLowerCase());
    // this.addressService.typeAppartment = this.typeRadio;
  }

  // Initialize search elements for MapAPI
  mapFormLoader() {

    this._maps.autocomplite(this.search_O.nativeElement)
      .subscribe(data => {
        this.o_lat = data._lat;
        this.o_lng = data._lng;
      });

    this._maps.autocomplite(this.search_D.nativeElement)
      .subscribe(data => {
        this.d_lat = data._lat;
        this.d_lng = data._lng;
      });

  }

  // showRoute() {
  //   this.toggleMap();
  //   if (this._renderMap) {
  //     this.getDistance();
  //   }
  // }

  getDistance() {
    // Save current route data to MapService
    this.storeMapData();
    // Get distance from MapService
    this._maps.distanceMatrix()
      .subscribe(data => {
        this.distance = data.distance;
        this.time = data.time;
      });
  }

  storeMapData() {
    let req = {
      o_lat: this.o_lat,
      o_lng: this.o_lng,
      d_lat: this.d_lat,
      d_lng: this.d_lng,
      type: this.type
    }
    this._maps.storeMapData(req);
  }

  floorChange(e, place) {
    const floor = +e.target.value;
    if (place === 'O') {
      this.o_floor = floor;
    }
    if (place === 'D') {
      this.d_floor = floor;
    }
    // console.log(this.o_floor, this.d_floor);
  }

  console() {
    // this.getDistance();
  }

}
