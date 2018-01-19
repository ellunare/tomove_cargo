import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';

import { MapsGoogleService } from '../../../-services/maps-google.service';

@Component({
  selector: 's1-map',
  templateUrl: './s1-map.component.html',
  styleUrls: ['./s1-map.component.sass']
})

export class S1MapComponent implements OnInit {

  @ViewChild('map') public map: ElementRef;

  distance: number;
  time: number;

  constructor(
    private _maps: MapsGoogleService
  ) { }

  ngOnInit() {
    this.getRouteInfo();
    this.initMap();
  }

  initMap() {
    this._maps.map(this.map.nativeElement);
  }

  getRouteInfo() {
    let data = this._maps.getRouteInfo();
    this.distance = data.distance;
    this.time = data.time;
  }

  navigate() {
    let nav_url = 'https://waze.com/ul?ll=';
    let waze = this._maps.getWazeData();
    window.open(nav_url + waze.d_lat + ',' + waze.d_lng, "_blank");
  }

}
