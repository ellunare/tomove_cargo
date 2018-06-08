import {
	Component,
	OnInit,
	ViewChild,
	ElementRef
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DomSanitizer } from '@angular/platform-browser';

import { CanvasService } from '../../shared/services/canvas.service';
import { MapsGoogleService } from '../../shared/services/maps-google.service';
import { RequestService } from '../../shared/services/request.service';

import { APARTMENT_TYPES } from '../../shared/models/APARTMENT_TYPES';
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
	PLACES = APARTMENT_TYPES;

	///////////////////////////// --- Adress
	@ViewChild('search_O') public search_O: ElementRef;
	@ViewChild('search_D') public search_D: ElementRef;
	search_O_map_render = false;
	search_D_map_render = false;

	type: any = 'DRIVING';

	///////////////////////////// --- Floors
	floors = [];

	@ViewChild('gmap') private gmap;

	// ---------------------------------------------------------------------- 2

	request: any = {
		adress: {
			o: {
				floor: undefined,
				lift: true
			},
			d: {
				floor: undefined,
				lift: false
			}
		},
		route: {
			distance: undefined,
			time: undefined
		},
		date: {
			day: undefined,
			time: undefined
		},
		place: 'apartment',
		rooms: [
			{
				id: 1,
				name: "bathroom",
				tags: [],
				pictures: [],
			},
			{
				id: 2,
				name: "salon",
				tags: [],
				pictures: []
			},
			{
				id: 3,
				name: "kitchen",
				tags: [],
				pictures: []
			}
		],
		packing: {
			carton: 40
		}
	}

	@ViewChild('camera') public camera: ElementRef;
	@ViewChild('cam_ramka') public cam_ramka: ElementRef;
	curFiles_arr = [];

	// tagId = 1;

	@ViewChild('item_picker') private item_picker;

	temp_tag = {
		name: '',
		price: 0,
		idhash: '',

		tagX: 0,
		tagY: 0,
	};
	temp_picture_id;

	itemnumber = 1;

	///////////////////////////// --- Total
	total_price = 0;

	///////////////////////////// --- Rooms
	current_room = 1;
	// rooms = rooms;

	// 
	// 
	// ---------------------------------------------------------------------- 3

	@ViewChild('canvasSS') public canvaSS: ElementRef;
	xx_canvas_msg: string = '';
	xx_upload_msg: string = '';
	xx_download_link: string = '';
	xx_download_msg: string = '';
	xx_loader = false;

	FUR = FURNITURE_LIST;

	// ---------------------------------------------------------------------- MISC

	constructor(
		private _maps: MapsGoogleService,
		private _request: RequestService,
		private _sanitizer: DomSanitizer,
		private _canvas: CanvasService,
		private _router: Router,
		private _AR: ActivatedRoute
	) { }

	ngOnInit() {
		this._AR.queryParams.subscribe(qp => {
			if (qp.page) { this.req_page = qp.page }
		});

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
		this._router.navigate(['/system', 'request'], { queryParams: { page: this.req_page } });
	}

	// ////////////////////////////////////////////////////////////////////////////////////////////
	// ////////////////////////////////////////////////////////////////////////////////////////////
	// STEP 1 -----------------------------------------------------------------------------------//

	initFloors() {
		const floorsMax = 50;
		for (let i = -5; i <= floorsMax; i++) {
			this.floors.push(i);
		}
	}

	onApartmentSelect() {
		// console.log(this.place);
	}

	// Initialize search elements for MapAPI
	mapFormLoader() {

		this._maps.autocomplete(this.search_O.nativeElement, 'O')
			.subscribe(data => {
				Object.assign(this.request.adress.o, data)
				this.search_O_map_render = true
				this.getDistance()
				console.log(this.request)
			})

		this._maps.autocomplete(this.search_D.nativeElement, 'D')
			.subscribe(data => {
				Object.assign(this.request.adress.d, data)
				this.search_D_map_render = true
				this.getDistance()
			})

	}

	// showRoute() {
	// 	this.toggleMap();
	// 	if (this._renderMap) {
	// 		this.getDistance();
	// 	}
	// }

	getDistance() {
		// Save current route data to MapService
		// this.storeMapData();

		if (this.search_O_map_render && this.search_D_map_render) {
			// Get distance from MapService
			this._maps.distanceMatrix()
				.then((data: any) => {
					// console.log(data)
					this.request.route.distance = Math.floor(data.distance);
					this.request.route.time = data.time;
				});
		}
	}

	// storeMapData() {
	// 	let req = {
	// 		o_lat: this.o_lat,
	// 		o_lng: this.o_lng,
	// 		d_lat: this.d_lat,
	// 		d_lng: this.d_lng,
	// 		type: this.type
	// 	}
	// 	this._maps.storeMapData(req);
	// }

	_toNumber(place) {
		this.request.adress[place].floor = +this.request.adress[place].floor
	}

	// Дата / Время
	evDTSelected(e, type) {
		this.request.date[type] = e;
	}

	showOnMap(type) {
		if (type === 'O') {
			if (this.search_O_map_render) {
				this.gmap.showMap('O');
				return;
			}
		}
		if (type === 'D') {
			if (this.search_D_map_render) {
				this.gmap.showMap('D');
				return;
			}
		}
		if (type === 'R') {
			this.gmap.showMap('R');
		}
	}

	// ////////////////////////////////////////////////////////////////////////////////////////////
	// ////////////////////////////////////////////////////////////////////////////////////////////
	// STEP 2 -----------------------------------------------------------------------------------//

	takePhoto(e) {
		const curFiles = this.camera.nativeElement.files;
		if (curFiles.length) {
			// const _url = window.URL.createObjectURL(curFiles[curFiles.length - 1]);
			// this.request.rooms[this.current_room].pictures.push(_url);
			this.request.rooms[this.current_room].pictures.push(curFiles[0]);
		}
	}

	sanitize(picture: File) {
		const _url = window.URL.createObjectURL(picture);
		return this._sanitizer.bypassSecurityTrustUrl(_url);
	}

	addTag(e) {
		// console.log(e);
		// console.log(e.offsetX, e.offsetY);
		e.preventDefault();
		e.stopPropagation();

		// Press on PHOTO
		if (e.target.parentElement.parentElement.classList.contains('cam-ramka')) {
			if (!e.srcElement.classList.contains('tag')) {
				this.temp_picture_id = e.srcElement.parentElement.dataset.id;
				this.temp_tag.tagX = e.layerX;
				this.temp_tag.tagY = e.layerY;
				// this.temp_tag.imgOne = e.srcElement.parentElement;

				this.item_picker.select();
			}

			// Press on TAG
			else {
				// const pictureId = e.srcElement.parentElement.dataset.id;
				const tagIdHash = e.srcElement.dataset.id;

				const tags = this.request.rooms[this.current_room].tags;
				e.srcElement.remove();

				for (let i = 0; i < tags.length; i++) {
					if (tags[i].idhash === tagIdHash) {
						this.request.rooms[this.current_room].tags.splice(i, 1);
						break;
					}
				}

				// const items = this.request.rooms[this.current_room].tags;
				// for (let i = 0; i < items.length; i++) {
				// 	if (items[i].idhash === tagIdHash) {
				// 		this.request.rooms[this.current_room].tags.splice(i, 1);
				// 		break;
				// 	}
				// }

			}
		}

	}

	evItemSelected(e) {
		this.temp_tag.idhash = this.generateId();
		this.temp_tag.name = e.item.name;
		this.temp_tag.price = e.item.price;

		this.drawTag();
	}

	generateId() {
		let num = '';
		const letters = 'abcdefghjiklmnopqrstvwxyz'
		let steps = 8;

		for (let i = 0; i < steps; i++) {
			if (i % 2 == 0) {
				var a = Math.floor((Math.random() * 10));
				num += a;
			}
			else {
				var a = Math.floor((Math.random() * letters.length));
				num += letters[a];
			}
		}

		return num;
	}

	itemNumber(flag) {
		if (flag === "null") {
			this.itemnumber = 1;
			return '';
		}
		return this.itemnumber++;
	}

	drawTag() {
		// this.request.rooms[this.current_room].tags.push(Object.create({
		// 	name: this.temp_tag.name,
		// 	idhash: this.temp_tag.idhash
		// }))

		const new_tag = Object.assign({}, this.temp_tag);
		this.request.rooms[this.current_room].tags.push(new_tag);
		console.log(this.request);
		// console.log(this.temp_tag);
	}

	roomPage(page) {
		if (page === 'prev') {
			if (this.current_room > 0) {
				this.current_room--;
			}
			else {
				this.current_room = this.request.rooms.length - 1
			}
		}
		if (page === 'next') {
			if (this.current_room < this.request.rooms.length - 1) {
				this.current_room++;
			}
			else {
				this.current_room = 0;
			}
		}
	}

	// ////////////////////////////////////////////////////////////////////////////////////////////
	// ////////////////////////////////////////////////////////////////////////////////////////////
	// STEP 3 -----------------------------------------------------------------------------------//

	// getPacking() {
	// 	return (this.request.rooms.length - 1) * 10
	// }

	requestUpload() {
		var __arr = [
			{ name: 'sdas', kk: 's112' },
			{ name: 'sdas', kk: 's112' },
			{ name: 'sdas', kk: 's112' },
			{ name: 'sdas', kk: 's112' }
		];

		const files: Array<File> = this.request.rooms[1].pictures;
		const formData: any = new FormData();

		for (let f of files) {
			formData.append("uploads[]", f, f['name']);
		}

		formData.append("reqID", 'xla29a9s');
		formData.append("room", 'Salon');
		formData.append("tags", JSON.stringify(__arr));

		this._request.requestUpload(formData);
	}



	xrequestdelete(file) {
		let hashID = this.generateId();
		this.xx_upload_msg = 'Отправка заявки';

		const formData: any = new FormData();
		formData.append("_file_to_upload", file, file['name']);

		formData.append("reqID", 'xla29a9s');
		formData.append("room", 'Probe');
		formData.append("hashID", hashID);

		this._request.requestUpload(formData)
			.subscribe((res: any) => {
				console.log(res);
				if (res.success) {
					this.xx_upload_msg = 'Успешно отправлено';
					this.xx_download_msg = 'Ссылка на скачивание';
					this.xx_download_link = res.result.Location;
					this.xx_loader = false;
				}
			});
	}

	canvasDraw() {
		this.xx_loader = true;
		this.xx_canvas_msg = 'Обработка изображений';
		// Передаем файлы и канвас
		this._canvas.prepareCanvas(
			this.request.rooms[1].pictures,
			this.canvaSS.nativeElement
		)
			.then(result_file => {
				this.xx_canvas_msg = 'Изображения обработаны';
				// this.xrequestdelete(result_file);
			})
	}


	totalPrice() {
		let _self = this
		let sum = 0
		let M = 1

		// DAY
		const _d = this.request.date.day.d
		if ((_d >= 1 && _d <= 8) || (_d >= 24 && _d <= 31)) M += 0.05

		// SEASON
		const _m = this.request.date.day.m
		if ((_m == 6 && _d >= 11) || (_m >= 7 && _m <= 8) || (_m == 9 && _d < 10)) M += 0.00

		// LIFT
		function _getFloorM(T) {
			const _floor = Math.abs(_self.request.adress[T].floor)
			const _floor_M = _floor * 0.025
			if (_floor <= 5) {
				return _floor_M
			}
			else {
				return 0.125
			}
		}
		M += _getFloorM('o')
		M += _getFloorM('d')

		// DISTANCE
		const car = 100
		const _dst = this.request.route.distance
		let _dst_M

		if (_dst > 0 && _dst <= 10) _dst_M = 7
		if (_dst > 10 && _dst <= 25) _dst_M = 6
		if (_dst > 25 && _dst <= 50) _dst_M = 5
		if (_dst > 50 && _dst <= 100) _dst_M = 4
		if (_dst > 100) _dst_M = 3

		const _distance = _dst * _dst_M * 1.5


		// FURNITURE
		let _furniture = 0
		for (let _room of this.request.rooms) {
			for (let _tag of _room.tags) {
				_furniture += _tag.price
			}
		}


		// PACKING
		let packing
		const _room_to_pack = (this.request.rooms.length - 1)
		const _carton = _room_to_pack * 10
		packing = _carton
		if (true) packing = _room_to_pack * 30

		sum = (car + _distance + _furniture + packing) * M

		alert(M + ' | ' + sum)
		return sum
	}


	// ////////////////////////////////////////////////////////////////////////////////////////////
	// ////////////////////////////////////////////////////////////////////////////////////////////
	// MISC - -----------------------------------------------------------------------------------//


	timeTransform(x) {
		var sec_num = parseInt(x, 10); // don't forget the second param

		var hours: any = Math.floor(sec_num / 60);
		var minutes: any = Math.floor((sec_num - (hours * 60)));

		if (hours < 10) { hours = "0" + hours; }
		if (minutes < 10) { minutes = "0" + minutes; }

		return hours + ':' + minutes;
	}

	console() {
		// this.getDistance();

		// console.log(this.rooms);
	}

}
