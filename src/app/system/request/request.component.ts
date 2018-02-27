import {
	Component,
	OnInit,
	ViewChild,
	ElementRef
} from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

import { MapsGoogleService } from '../../shared/services/maps-google.service';

import { APPARTMENT_TYPES } from '../../shared/models/APPARTMENT_TYPES';
import { FURNITURE_LIST, rooms } from '../../shared/models/FURNITURE_LIST';

@Component({
	selector: 'request',
	templateUrl: './request.component.html',
	styleUrls: ['./request.component.sass']
})
export class RequestComponent implements OnInit {

	req_page = 1;

	// ---------------------------------------------------------------------- 1

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
	// @ViewChild('floor_O') public lift_O: ElementRef;
	// lift_O = false;
	// lift_D = false;

	o_lift: boolean = false;
	d_lift: boolean = false;

	///////////////////////////// --- Date and Time
	request_time: any;
	request_date: any;

	// ---------------------------------------------------------------------- 2

	@ViewChild('camera') public camera: ElementRef;
	@ViewChild('cam_ramka') public cam_ramka: ElementRef;
	curFiles_arr = [];

	tagId = 1;

	@ViewChild('item_picker') private item_picker;

	temp_tag;

	///////////////////////////// --- Furniture
	// FURNITURE = FURNITURE_LIST;
	// f_typeId: number;
	// f_Id: number;
	// showItems: boolean = false;
	// roomItemList = [];

	///////////////////////////// --- Total
	total_price = 0;

	///////////////////////////// --- Rooms
	current_room = 2;
	rooms = rooms;

	// ---------------------------------------------------------------------- 3

	constructor(
		private _maps: MapsGoogleService,
		private _sanitizer: DomSanitizer
	) { }

	ngOnInit() {
		this.initFloors();
		this.mapFormLoader();
	}

	// PAGER

	pager(dir) {
		if (dir === 'N') {
			if (this.req_page < 3) {
				this.req_page++;
			}
		}
		if (dir === 'P') {
			if (this.req_page > 1) {
				this.req_page--;
			}
		}
	}


	// STEP 1 -----------------------------------------------------------------------------------//

	initFloors() {
		const floorsMax = 50;
		for (let i = -5; i <= floorsMax; i++) {
			this.floors.push(i);
		}
	}

	onAppartmentSelect() {
		console.log(this.place);
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

	// Изменение этажа
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

	// Переключатели
	// liftCheck(e, place) {
	// 	const check = e.target.check;
	// 	if (place === 'O') {
	// 		this.o_lift = check;
	// 	}
	// 	if (place === 'D') {
	// 		// this.d_lift = check;
	// 	}
	// }

	// Дата выбрана
	evDateSelected(e) {
		this.request_date = e;
		// let d = new Date((e.m + 1) + '/' + e.d + '/' + e.y);
		// console.log(d);
	}

	// Время выбрано
	evTimeSelected(e) {
		this.request_time = e;
		// console.log(e);
	}

	// STEP 2 -----------------------------------------------------------------------------------//

	takePhoto(e) {
		// console.log(e, this.camera);
		const curFiles = this.camera.nativeElement.files;
		if (curFiles.length) {
			const _url = window.URL.createObjectURL(curFiles[curFiles.length - 1]);
			this.curFiles_arr.push(_url);
			// console.log(this.curFiles_arr);
		}
	}

	sanitize(url: string) {
		return this._sanitizer.bypassSecurityTrustUrl(url);
	}

	addTag(e) {
		// console.log(e);
		// console.log(e.offsetX, e.offsetY);
		e.preventDefault();
		e.stopPropagation();

		if (e.target.parentElement.parentElement.classList.contains('cam-ramka')) {
			if (!e.srcElement.classList.contains('tag')) {
				const data = {
					tagX: e.offsetX,
					tagY: e.offsetY,
					imgOne: e.srcElement.parentElement
				}
				this.temp_tag = data;

				this.item_picker.select();
			}
			else {
				e.srcElement.remove();
			}
		}
		
	}
	
	evItemSelected(e) {
		console.log(e);
		this.drawTag(this.temp_tag.tagX, this.temp_tag.tagY, this.temp_tag.imgOne);
	}

	drawTag(x, y, container) {
		let tag = document.createElement('div');
		tag.classList.add('tag');
		tag.style.marginLeft = (x - 10) + 'px';
		tag.style.marginTop = (y - 10) + 'px';

		tag.innerText = String(this.tagId++);

		container.insertAdjacentElement('afterbegin', tag);
	}

	// totalPrice() {
	// 	this.total_price = 0;
	// 	const sum = this.roomItemList.reduce((prev, next) => {
	// 		return prev += next.price;
	// 	}, this.total_price);
	// 	this.total_price = sum;
	// }

	roomPage(page) {
		if (page === 'prev') {
			if (this.current_room > 1) {
				this.current_room--;
			}
			else {
				this.current_room = this.rooms.length
			}
		}
		if (page === 'next') {
			if (this.current_room < this.rooms.length) {
				this.current_room++;
			}
			else {
				this.current_room = 1;
			}
		}
	}

	// STEP 3 -----------------------------------------------------------------------------------//

	console() {
		// this.getDistance();
		console.log(this.o_lift, this.d_lift);

		// console.log(this.rooms);
	}

}
