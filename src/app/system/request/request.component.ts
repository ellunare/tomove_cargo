import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';

import { MapsGoogleService } from '../../shared/services/maps-google.service';

import { APPARTMENT_TYPES } from '../../shared/models/APPARTMENT_TYPES';
import { FURNITURE_LIST } from '../../shared/models/FURNITURE_LIST';

@Component({
  selector: 'request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.sass']
})
export class RequestComponent implements OnInit {

  ///////////////////////////// --- Place type
  PLACES = APPARTMENT_TYPES;
  place: string;

  ///////////////////////////// --- Adress
  @ViewChild('search_O') public search_O: ElementRef;
  @ViewChild('search_D') public search_D: ElementRef;

  o_lat: number;
  o_lng: number;
  d_lat: number;
  d_lng: number;
  type: any = 'driving';
  distance: number;
  time: number;

  ///////////////////////////// --- Floors
  @ViewChild('floor_O') public floor_O: ElementRef;
  @ViewChild('floor_D') public floor_D: ElementRef;

  o_floor: number;
  d_floor: number;

  floors = [];

  ///////////////////////////// --- Switches
  @ViewChild('floor_O') public lift_O: ElementRef;

  o_lift: boolean = false;

  ///////////////////////////// --- Date and Time
  request_time: any;
  request_date = new Date();

  ///////////////////////////// --- Furniture
  FURNITURE = FURNITURE_LIST;
  f_typeId: number;
  // f_Id: number;
  showItems: boolean = false;
  roomItemList = [];

  ///////////////////////////// --- Total
  total_price = 0;

  ///////////////////////////// --- Rooms
  current_room = 1;
  rooms = [
    {
      id: 1,
      name: "ZAL",
      items: [
        {
          id: 2,
          name: 'haha',
          price: 200
        },
        {
          id: 3,
          name: 'hasdaha',
          price: 200
        },
        {
          id: 2,
          name: 'hww22aha',
          price: 200
        },
      ]
    },
    {
      id: 2,
      name: "kuhnia",
      items: [
        {
          id: 2,
          name: '243haha',
          price: 200
        },
        {
          id: 3,
          name: '9989hasdaha',
          price: 200
        },
        {
          id: 2,
          name: '006fhww22aha',
          price: 200
        },
      ]
    },
    {
      id: 3,
      name: "vanna",
      items: [
        {
          id: 2,
          name: 'hasdaha',
          price: 200
        },
        {
          id: 3,
          name: 'h2223asdaha',
          price: 200
        },
        {
          id: 2,
          name: 'h3131ww22aha',
          price: 200
        },
      ]
    }
  ]

  constructor(
    private _maps: MapsGoogleService
  ) { }

  ngOnInit() {
    this.initFloors();
    this.mapFormLoader();
  }

  initFloors() {
    const floorsMax = 50;
    for (let i = -5; i <= floorsMax; i++) {
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

  liftCheck(e, place) {
    const check = e.target.check;
    if (place === 'O') {
      this.o_lift = check;
    }
    if (place === 'D') {
      // this.d_lift = check;
    }
  }

  selectItemType(e) {
    const id = e.target.parentElement.dataset.id;
    this.f_typeId = id;
    this.showItems = true;
  }

  onItemSelected(e) {
    const id = e.target.parentElement.dataset.id;
    this.showItems = false;
    this.roomItemList.push(this.FURNITURE[this.f_typeId - 1].types[id - 1]);
    this.totalPrice();
  }

  totalPrice() {
    this.total_price = 0;
    const sum = this.roomItemList.reduce((prev, next) => {
      return prev += next.price;
    }, this.total_price);
    this.total_price = sum;
  }

  roomPage(page) {
    if (page === 'prev' && this.current_room > 1) {
      this.current_room--;
    }
    if (page === 'next' && this.current_room < this.rooms.length) {
      this.current_room++;
    }
  }

  console() {
    // this.getDistance();
    // console.log(this.total_price);
  }

}
