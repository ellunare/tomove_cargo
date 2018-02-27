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

	tagId = 1;

	///////////////////////////// --- Furniture
	FURNITURE = FURNITURE_LIST;
	f_typeId: number;
	// f_Id: number;
	showItems: boolean = false;
	roomItemList = [];

	///////////////////////////// --- Total
	total_price = 0;

	///////////////////////////// --- Rooms
	current_room = 2;
	rooms = [
		{
			id: 1,
			name: "bathroom",
			items: [
				{
					id: 2,
					name: '01 - Washer',
					price: 200
				},
				{
					id: 3,
					name: '02 - Table',
					price: 200
				},
				{
					id: 2,
					name: '03 - Shelf',
					price: 200
				},
			]
		},
		{
			id: 2,
			name: "salon",
			items: [
				{
					id: 2,
					name: '01 - TV 32',
					price: 200
				},
				{
					id: 3,
					name: '02 - Sofa 2',
					price: 200
				},
				{
					id: 2,
					name: '03 - Table',
					price: 200
				},
			]
		},
		{
			id: 3,
			name: "kitchen",
			items: [
				{
					id: 2,
					name: '01 - Microwave',
					price: 200
				},
				{
					id: 3,
					name: '02 - Table',
					price: 200
				},
				{
					id: 2,
					name: '03 - Fridge 400',
					price: 200
				},
			]
		}
	]

	// ---------------------------------------------------------------------- 3

	constructor(
		private _maps: MapsGoogleService
	) { }

	ngOnInit() {
		this.photoAppInit();
		this.initFloors();
		this.mapFormLoader();
	}

	// PAGER

	stepNext() {
		if (this.req_page < 3) {
			this.req_page++;
		}
	}

	stepPrev() {
		if (this.req_page > 1) {
			this.req_page--;
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

	photoAppInit() {
		// this.cam_ramka.nativeElement.addEventListener('click', this.addTag);
		// this.cam_ramka.nativeElement.addEventListener('touchstart ', this.addTag);


		// const
		// camera = document.querySelector('#camera'),
		// ramka = document.querySelector('.ramka'),
		// imgs = document.querySelector('.imgs'),
		// bodyText = document.querySelector('.text'),
		// tagList = document.querySelector('#tags')
		// ;

		// let tagId = 1;

		// camera.addEventListener('change', updateImageDisplay);
	}

	updateImageDisplay() {
		const curFiles = this.camera.nativeElement.files;

		for (let i = 0; i < curFiles.length; i++) {
			let image = document.createElement('img');
			image.src = window.URL.createObjectURL(curFiles[i]);

			let imgOne = document.createElement('div');
			imgOne.classList.add('img_one');
			imgOne.appendChild(image);

			this.cam_ramka.nativeElement.appendChild(imgOne);
		}
	}

	addTag(e) {
		console.log(e);
		console.log(e.offsetX, e.offsetY);
		e.preventDefault();
		e.stopPropagation();

		if (e.target.parentElement.parentElement.classList.contains('cam-ramka')) {
			if (!e.srcElement.classList.contains('tag')) {
				let tagX = e.offsetX;
				let tagY = e.offsetY;

				let imgOne = e.srcElement.parentElement;
				this.adrawTag(tagX, tagY, imgOne);
			}
			else {
				e.srcElement.remove();
			}
		}

	}

	adrawTag(x, y, container) {
		// console.log(x, y, container);
		let tag = document.createElement('div');
		tag.classList.add('tag');
		tag.style.marginLeft = (x - 10) + 'px';
		tag.style.marginTop = (y - 10) + 'px';

		tag.innerText = String(this.tagId++);

		container.insertAdjacentElement('afterbegin', tag);
	}

	selectItemType(e) {
		const id = e.target.parentElement.dataset.id;
		this.f_typeId = id;
		this.showItems = true;
	}

	onItemSelected(e) {
		const id = e.target.parentElement.dataset.id;
		this.showItems = false;
		this.rooms[this.current_room - 1].items.push(this.FURNITURE[this.f_typeId - 1].types[id - 1]);
		// this.totalPrice();
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
