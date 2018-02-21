import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';

import { MapsGoogleService } from '../../../shared/services/maps-google.service';

@Component({
  selector: 's1-wrap',
  templateUrl: './s1-wrap.component.html',
  styleUrls: ['./s1-wrap.component.sass']
})

// export 
class S1WrapComponent implements OnInit {

  o_lat: number;
  o_lng: number;

  d_lat: number;
  d_lng: number;

  type: any = 'driving';

  distance: number;
  time: number;

  @ViewChild('search_O') public search_O: ElementRef;
  @ViewChild('search_D') public search_D: ElementRef;

  _renderMap = false;

  constructor(
    private _maps: MapsGoogleService
  ) { }

  ngOnInit() {
    this.mapFormLoader();
  }

  console() {
    console.log(this.o_lat);
    console.log(this.o_lng);

    console.log(this.d_lat);
    console.log(this.d_lng);

    console.log(this.distance);
    console.log(this.time);
  }

  toggleMap() {
    this._renderMap = !this._renderMap;
  }

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

  showRoute() {
    this.toggleMap();
    if (this._renderMap) {
      this.getDistance();
    }
  }

  getDistance() {
    this.storeMapData();

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

}

