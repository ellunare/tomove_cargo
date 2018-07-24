import {
	Component,
	OnInit,
	ViewChild,
	ElementRef
	// , HostListener
} from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { DomSanitizer } from '@angular/platform-browser'

import { CanvasService } from '../../shared/services/canvas.service'
import { MapsGoogleService } from '../../shared/services/maps-google.service'
import { RequestService } from '../../shared/services/request.service'

import { LIFT_TYPES } from '../../shared/models/TYPES'
import { FURNITURE_LIST } from '../../shared/models/FURNITURE_LIST'
import { LNG_PACK } from '../../shared/models/LOCALIZATION'

@Component({
	selector: 'request',
	templateUrl: './request.component.html',
	styleUrls: ['./request.component.sass']
})
export class RequestComponent implements OnInit {

	lng = undefined
	LNG = LNG_PACK

	req_page = 1

	// ---------------------------------------------------------------------- 1

	///////////////////////////// --- Place type
	LIFTS = LIFT_TYPES

	///////////////////////////// --- Adress
	@ViewChild('search_O') public search_O: ElementRef
	@ViewChild('search_D') public search_D: ElementRef
	search_O_map_render = false
	search_D_map_render = false

	@ViewChild('gmap') private gmap

	// ---------------------------------------------------------------------- 2

	request: any = {
		requestID: undefined,
		xx: undefined,
		adress: {
			o: {
				info: {
					e: undefined,
					f: undefined,
					n: undefined,
					t: undefined
				},
				lift: 0
			},
			d: {
				info: {
					e: undefined,
					f: undefined,
					n: undefined,
					t: undefined
				},
				lift: 0
			}
		},
		route: {
			distance: undefined,
			time: undefined
		},
		date: {
			day: {
				d: undefined,
				m: undefined,
				y: undefined
			},
			time: {
				m: undefined,
				h: undefined
			}
		},
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
		rawh: 0,
		packing: {
			carton: 0,
			boxes: false,
			pack: false
		},
		customer: {
			name: undefined,
			phone: undefined
		}
	}

	@ViewChild('camera') public camera: ElementRef
	@ViewChild('cam_frame') public cam_frame: ElementRef
	@ViewChild('photos') public photos: ElementRef
	curFiles_arr = []

	@ViewChild('item_picker') private item_picker
	@ViewChild('item_edit') private item_edit

	temp_tag = {
		name: '',
		price: 0,
		idhash: '',
		tagX: 0,
		tagY: 0,
		count: 1,
		trash: false,
		da: 0
	}

	temp_picture_id

	itemnumber = 1

	// openModalItemEdit = false

	///////////////////////////// --- Rooms
	current_room = 1
	room_modal = {
		r: false,
		d: false
	}

	// ---------------------------------------------------------------------- 3

	carton_modal = false

	///////////////////////////// --- Total
	total_price = 0

	agree_valid = false

	@ViewChild('canvasSS') public canvaSS: ElementRef
	xx_canvas_msg: string = ''
	xx_upload_msg: string = ''
	xx_download_link: string = ''
	xx_download_msg: string = ''
	xx_loader = false

	FUR = FURNITURE_LIST

	/////////////////// CAN DEACTIVATE ///////////////////
	// canDeactivate: boolean = true
	// toDeactivate() {
	// 	const text = "You have unsaved changes! If you leave, your changes will be lost."
	// 	return this.canDeactivate ? true : confirm(text)
	// }

	// @HostListener("window:beforeunload", ["$event"]) unloadNotification($event: any) {
	// 	// $event.returnValue = this.canDeactivate ? true : false
	// 	if (!this.toDeactivate()) {
	// 		$event.returnValue = "This message is displayed to the user in IE and Edge when they navigate without using Angular routing (type another URL/close the browser/etc)";
	// 	}
	// }

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
		this.getLNG()
		this.initPage()

		this.request.requestID = 'r' + this.generateId()
		this.request.xx = this.generateXX()

		this.getCarton()

		this.mapFormLoader('o')
		this.mapFormLoader('d')

		// setTimeout(() => {
		// 	this.canDeactivate = false
		// 	console.log('canDeactivate')
		// }, 5000)
		// console.log(this.LNG[this.lng])
	}

	getLNG() {
		this._AR.params.subscribe(params => {
			this.lng = params.lng
			// Язык не существует
			if (!this.LNG[this.lng]) this._router.navigate(['/en', 'request'])
		})
	}

	initPage() {
		this._AR.queryParams.subscribe(qp => {
			if (qp.page) this.req_page = qp.page
			else this._router.navigate(['/en', 'request'], { queryParams: { page: this.req_page } })
		})
	}

	// PAGER

	pager(dir) {
		if (dir === 'N') {
			if (this.req_page < 3) {
				this.req_page++
			}
		}
		if (dir === 'P') {
			if (this.req_page > 1) {
				this.req_page--
			}
		}
		this._router.navigate([], { relativeTo: this._AR, queryParams: { page: this.req_page } })
	}

	// ////////////////////////////////////////////////////////////////////////////////////////////
	// STEP 1 -----------------------------------------------------------------------------------//
	// ////////////////////////////////////////////////////////////////////////////////////////////

	getLiftText(flag) {
		let idx = this.request.adress[flag].lift
		return this.LIFTS[idx].text
	}

	getLiftColor(flag) {
		const _class = {
			1: 'c_green',
			2: 'c_orange'
		}
		return _class[this.request.adress[flag].lift]
	}

	// Initialize search elements for MapAPI
	mapFormLoader(t) {
		const T = t.toUpperCase()

		this._maps.autocomplete(this['search_' + T].nativeElement, T)
			.subscribe(data => {
				Object.assign(this.request.adress[t], data)
				this['search_' + T + '_map_render'] = true
				this.getDistance()

				// console.log(this.request)
			})
	}

	getDistance() {
		// Save current route data to MapService
		// this.storeMapData()

		if (this.search_O_map_render && this.search_D_map_render) {
			// Get distance from MapService
			this._maps.distanceMatrix()
				.then((data: any) => {
					if (data.status === 'ZR') {
						this.request.route.distance = -999
					}
					else {
						const __dist = Math.floor(data.distance * 10) / 10

						this.request.route.distance = __dist < 1 ? 1 : __dist
						this.request.route.time = data.time
					}
				})
		}
	}

	// _toNumber(place) {
	// 	this.request.adress[place].floor = +this.request.adress[place].floor
	// }

	// Дата / Время
	evDTSelected(e, type) {
		this.request.date[type] = e
	}

	evPlaceEdited(e, type) {
		// console.log(e, type)
		if (e.t === 'store') this.request.adress[type].lift = 0

		this.request.adress[type].info = e
	}

	showOnMap(type) {
		if (type === 'O') {
			if (this.search_O_map_render) {
				this.gmap.showMap('O')
				return
			}
		}
		if (type === 'D') {
			if (this.search_D_map_render) {
				this.gmap.showMap('D')
				return
			}
		}
		if (type === 'R') {
			this.gmap.showMap('R')
		}
	}

	// ////////////////////////////////////////////////////////////////////////////////////////////
	// STEP 2 -----------------------------------------------------------------------------------//
	// ////////////////////////////////////////////////////////////////////////////////////////////

	takePhoto(e) {
		const curFiles = this.camera.nativeElement.files
		if (curFiles.length) this.request.rooms[this.current_room].pictures.push(curFiles[0])

		setTimeout(() => {
			this._scrollCamFrame()
		}, 100)
	}

	_scrollCamFrame() {
		const _photos_width = this.photos.nativeElement.scrollWidth
		const _last_img = this.photos.nativeElement.children[this.photos.nativeElement.children.length - 1].width

		this.cam_frame.nativeElement.scrollLeft = _photos_width - _last_img - 20
	}

	sanitize(picture: File) {
		const _url = window.URL.createObjectURL(picture)
		return this._sanitizer.bypassSecurityTrustUrl(_url)
	}

	addTag(e) {
		// console.log(e.target.scrollHeight, e)
		// console.log(e.offsetX, e.offsetY)
		e.preventDefault()
		e.stopPropagation()

		// Press on PHOTO
		if (e.target.parentElement.classList.contains('photos')) {
			if (!e.target.classList.contains('tag')) {

				// this.request.rawh = e.target.scrollHeight
				if (!this.request.rawh) this.request.rawh = e.target.scrollHeight

				this.temp_picture_id = e.srcElement.parentElement.dataset.id
				this.temp_tag.tagX = e.layerX
				this.temp_tag.tagY = e.layerY

				this.item_picker.select()
			}

		}
	}

	evItemSelected(e) {
		const tagParams = {
			idhash: this.generateId(),
			name: e.item.name,
			price: e.item.price,
			count: 1,
			trash: false,
			PID: e.id_type,
			CID: e.item.id,

			da: e.item.da ? 11 : 0,
			dap: e.item.dap ? e.item.dap : 0
		}


		Object.assign(this.temp_tag, tagParams)
		// console.log(this.temp_tag)
		// console.log(e)

		this.drawTag()
	}

	generateId() {
		let num = ''
		const letters = 'abcdefghjiklmnopqrstvwxyz'
		let steps = 8

		for (let i = 0; i < steps; i++) {
			if (i % 2 == 0) {
				let a = Math.floor((Math.random() * 10))
				num += a
			}
			else {
				let a = Math.floor((Math.random() * letters.length))
				num += letters[a]
			}
		}

		return num
	}

	generateXX() {
		let _string = ''
		const num = '1234567899'

		for (let i = 0; i < 4; i++) {
			let a = +Math.random().toString()[2]
			_string += num[a]
		}

		return +_string
	}

	itemNumber(flag) {
		if (flag === "null") {
			this.itemnumber = 1
			return ''
		}
		return this.itemnumber++
	}

	itemCount(tag) {
		if (tag.count > 1) {
			return ` X ${tag.count}`
		}
		return ''
	}

	drawTag() {
		const new_tag = Object.assign({}, this.temp_tag);
		this.request.rooms[this.current_room].tags.push(new_tag);

		// console.log(this.request);
		// console.log(this.temp_tag);
	}

	editItem(e) {
		if (e.target.dataset.id) {
			let tagToEdit = {}
			const _hash = e.target.dataset.id

			for (let _t of this.request.rooms[this.current_room].tags) {
				if (_t.idhash === _hash) {
					tagToEdit = _t
					break
				}
			}

			this.item_edit.editItem(tagToEdit)
		}
	}

	evItemEdited(etag) {
		const _hash = etag.idhash
		const _t = this.request.rooms[this.current_room].tags

		for (let i = 0; i < _t.length; i++) {
			if (_t[i].idhash === _hash) {

				if (etag.delete) {
					this.request.rooms[this.current_room].tags.splice(i, 1)
					break
				}

				_t[i].count = etag.count
				_t[i].trash = etag.trash
				break
			}
		}

		// console.log(this.request)
	}

	roomPage(page) {
		const _len = this.request.rooms.length
		let _cr = this.current_room

		if (page === 'prev') this.current_room = _cr > 0 ? _cr - 1 : _len - 1
		if (page === 'next') this.current_room = _cr < _len - 1 ? _cr + 1 : 0
	}

	getRoomTitle(dir) {
		const _len = this.request.rooms.length
		const _cr = this.current_room

		if (dir === 'L') return _cr === 0 ? _len - 1 : _cr - 1
		if (dir === 'R') return _cr === _len - 1 ? 0 : _cr + 1
	}

	addRoom() {
		const _id = this.request.rooms.length

		let roomToAdd = {
			id: _id,
			name: 'room ' + (_id - 2),
			tags: [],
			pictures: []
		}

		this.request.rooms.push(roomToAdd)

		this.current_room = _id
		this.getCarton()
	}

	delRoom() {
		this.request.rooms.splice(this.current_room, 1)

		let _r = this.request.rooms
		if (_r.length > 2) {
			for (let i = 3; i < _r.length; i++) {
				_r[i].name = 'room ' + (i - 2)
			}
		}

		this.current_room--
		this.room_modal.d = false
		this.getCarton()
	}

	resetRoom() {
		const _cr = this.request.rooms[this.current_room]
		_cr.pictures = []
		_cr.tags = []
		this.room_modal.r = false
	}

	roomModal(type, flag) {
		if (type === 'r') {
			let _crp = this.request.rooms[this.current_room].pictures
			if (_crp.length) {
				if (flag === 'O') this.room_modal.r = true
				if (flag === 'N') this.room_modal.r = false
				if (flag === 'R') this.resetRoom()
			}
			else return true
		}

		if (type === 'd') {
			if (flag === 'O') this.room_modal.d = true
			if (flag === 'N') this.room_modal.d = false
			if (flag === 'D') this.delRoom()
		}
	}

	getItemsRoom() {
		let _sum = 0
		let _item
		for (let _t of this.request.rooms[this.current_room].tags) {
			_item = 1 * _t.count
			_sum += _item
		}
		return _sum
	}

	getItemsTotal() {
		let _sum = 0
		let _item
		for (let _r of this.request.rooms) {
			for (let _t of _r.tags) {
				_item = 1 * _t.count
				_sum += _item
			}
		}
		return _sum
	}

	// ////////////////////////////////////////////////////////////////////////////////////////////
	// STEP 3 -----------------------------------------------------------------------------------//
	// ////////////////////////////////////////////////////////////////////////////////////////////

	cartonModal(flag) {
		if (flag === 'show') this.carton_modal = true
		if (flag === 'hide') this.carton_modal = false
	}

	getCarton(flag?) {
		const _carton = (this.request.rooms.length - 1) * 15
		if (flag === 'get') return _carton
		this.request.packing.carton = _carton
	}

	// requestUpload() {
	// 	var __arr = [
	// 		{ name: 'sdas', kk: 's112' },
	// 		{ name: 'sdas', kk: 's112' },
	// 		{ name: 'sdas', kk: 's112' },
	// 		{ name: 'sdas', kk: 's112' }
	// 	]

	// 	const files: Array<File> = this.request.rooms[1].pictures
	// 	const formData: any = new FormData()

	// 	for (let f of files) {
	// 		formData.append("uploads[]", f, f['name'])
	// 	}

	// 	formData.append("reqID", 'xla29a9s')
	// 	formData.append("room", 'Salon')
	// 	formData.append("tags", JSON.stringify(__arr))

	// 	this._request.requestUpload(formData)
	// }



	requestUpload(files) {
		this.xx_upload_msg = 'Отправка заявки'

		const formData: any = new FormData()

		//// Готовим фото
		for (let _f of files) {
			const _fname = (_f.name[0] === 'r') ? 'r' + _f.name.slice(5) : _f.name[0]
			formData.append('_file', _f.file, _fname)
		}

		//// Готовим заявку - удаляем фото
		let requestToUpload: any = {}
		requestToUpload = JSON.parse(JSON.stringify(this.request))

		for (let _r of requestToUpload.rooms) {
			delete _r.pictures
		}

		//// Добавляем параметры
		formData.append('requestObject', JSON.stringify(requestToUpload))

		//// Отправляем
		this._request.requestUpload(formData)
			.subscribe((res: any) => {
				console.log(res)
				this.xx_loader = false
				if (res.success) {
					this.xx_upload_msg = 'Успешно отправлено'
					// this.xx_download_msg = 'Ссылка на скачивание'
					// this.xx_download_link = res.result.Location
					alert('SUCCESS')
				}
				else {
					alert('error')
				}
			})
	}

	canvasDraw() {
		this.xx_loader = true
		this.xx_canvas_msg = 'Обработка изображений'

		// Передаем файлы и канвас
		// this._canvas.prepareCanvas(
		// 	this.request.rooms[1].pictures,
		// 	this.canvaSS.nativeElement
		// )
		// 	.then(result_file => {
		// 		console.log(result_file)
		// 		this.xx_canvas_msg = 'Изображения обработаны'
		// 		this.xrequestdelete(result_file)
		// 	})

		let canvas_arr = []
		for (let _c of this.request.rooms) {
			if (_c.pictures.length) {
				let _promise = this._canvas.prepareCanvas(_c.pictures, null, _c.name)
				canvas_arr.push(_promise)
			}
		}

		Promise.all(canvas_arr).then(result_files => {
			// console.log(result_files)
			// this.requestUpload(result_files)

			this.requestUpload(result_files)
		})

	}

	priceMod() {
		let M = {
			DS: 0,
			LO: 0,
			LD: 0
		}

		// DAY
		const _d = this.request.date.day.d
		if ((_d >= 1 && _d <= 8) || (_d >= 24 && _d <= 31)) M.DS += 0.05

		// SEASON
		const _m = this.request.date.day.m
		if ((_m == 6 && _d >= 11) || (_m >= 7 && _m <= 8) || (_m == 9 && _d < 10)) M.DS += 0.05

		// LIFT
		let _self = this

		function _getFloorM(T) {
			const isLift = _self.request.adress[T].lift

			const count = Math.abs(+_self.request.adress[T].info.f)
			const multiplier = isLift ? 0.005 : 0.025
			const max = isLift ? 0.05 : 0.1

			const result = count * multiplier

			return result <= max ? result : max
		}
		M.LO += _getFloorM('o')
		M.LD += _getFloorM('d')

		return M
	}

	priceCarOrder() {
		const car = 100
		const _dst = this.request.route.distance
		let _dst_mod

		if (_dst > 0 && _dst <= 10) _dst_mod = 7
		if (_dst > 10 && _dst <= 25) _dst_mod = 6
		if (_dst > 25 && _dst <= 50) _dst_mod = 5
		if (_dst > 50 && _dst <= 100) _dst_mod = 4
		if (_dst > 100) _dst_mod = 3

		const _distance = _dst * _dst_mod * 1.5

		return Math.floor(car + _distance)
	}

	priceFurniture() {
		const M = this.priceMod()

		let _furniture = 0
		for (let _room of this.request.rooms) {
			for (let _tag of _room.tags) {
				_furniture += ((_tag.price * (_tag.trash ? 0.6 : 1) * (1 + M.DS + M.LO + (_tag.trash ? 0 : M.LD))) + (_tag.da === 11 ? _tag.dap : 0)) * _tag.count
			}
		}
		return Math.floor(_furniture)
	}

	pricePacking(flag) {
		const M = this.priceMod()

		let total = 0
		const _carton = this.request.packing.carton

		if (flag === 'transportation') {
			total = _carton * (1 + M.DS + M.LO + M.LD) * 10
			return Math.floor(total)
		}

		if (flag === 'pack') {
			total = 0
			if (this.request.packing.pack) total = _carton * 20
			if (this.request.packing.boxes) total += _carton * 5
			return total
		}

	}


	totalPrice() {
		let sum = 0

		// CAR
		let car = this.priceCarOrder()
		// TRANSPORTATION
		let items = this.priceFurniture()
		// PACKING
		let packing_transportation = this.pricePacking('transportation')
		let packing_pack = this.pricePacking('pack')

		sum = car + items + packing_transportation + packing_pack

		if (sum < 200) {
			return 200
		}
		else {
			let _remain = Math.floor(sum) % 100
			return _remain < 50 ? Math.floor(sum / 100) * 100 + 50 : Math.floor(sum / 100) * 100 + 100
		}
	}

	///////////////////// VALIDATION /////////////////////

	valert(x, place) {
		const _p = this.request.adress[place]
		// console.log(_p)

		// LOCATION
		if (x === 'R1_SL') if (_p.city && _p.street && _p.number) return true

		if (x === 'R1_PI') {
			if (_p.info.t !== undefined) {
				switch (_p.info.t) {
					case 'apartment':
						if (_p.info.f && _p.info.n) return true
						break
					case 'office':
						if (_p.info.f) return true
						break
					default:
						return true
				}
			}
		}

		// DAY / TIME
		if (x === 'R1_DAY') if (this.request.date.day.d) return true
	}

	validation(flag) {
		if (flag === 'price') {
			if (
				this.valert('R1_SL', 'o') &&
				this.valert('R1_PI', 'o') &&
				this.valert('R1_SL', 'd') &&
				this.valert('R1_PI', 'd') &&
				this.valert('R1_DAY', null)
			) {
				return true
			}
		}

		if (flag === 'confirm') {
			if (
				this.request.customer.name &&
				this.request.customer.phone &&
				this.agree_valid
			) {
				return true
			}
		}
	}

	confirm() {
		if (this.validation('confirm')) {
			// alert('YES')
			this.canvasDraw()
		}
	}

	// ////////////////////////////////////////////////////////////////////////////////////////////
	// ////////////////////////////////////////////////////////////////////////////////////////////
	// MISC - -----------------------------------------------------------------------------------//


	timeTransform(x) {
		var sec_num = parseInt(x, 10) // don't forget the second param

		var hours: any = Math.floor(sec_num / 60)
		var minutes: any = Math.floor((sec_num - (hours * 60)))

		if (hours < 10) { hours = "0" + hours }
		if (minutes < 10) { minutes = "0" + minutes }

		return hours + ':' + minutes
	}

	// console() {
	// 	// this.getDistance();

	// 	// console.log(this.rooms);
	// }

	// ddd(e) {
	// 	console.log(e)
	// }

	nextLNG() {
		const L = this.lng
		switch (L) {
			case 'en': this.lng = 'ru'
				break
			case 'ru': this.lng = 'he'
				break
			case 'he': this.lng = 'en'
				break
		}
		this._router.navigate([this.lng, 'request'], { queryParams: { page: this.req_page } })
	}

}
