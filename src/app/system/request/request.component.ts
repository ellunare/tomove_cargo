import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core'
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
export class RequestComponent implements OnInit, AfterViewInit {

	lng = undefined
	LNG = LNG_PACK

	req_page = 1

	@ViewChild('gmap') private gmap
	@ViewChild('datePicker') private datePicker
	@ViewChild('timePicker') private timePicker

	// ---------------------------------------------------------------------- 1

	///////////////////////////// --- Place type
	LIFTS = LIFT_TYPES

	///////////////////////////// --- Adress
	map_render_search = {
		O: false,
		D: false,
		R: true
	}

	ACI = [
		{ a: 'o', A: 'O' },
		{ a: 'd', A: 'D' },
	]
	@ViewChildren('aci') acinputs: QueryList<ElementRef>

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
			date: {
				d: undefined,
				m: undefined,
				y: undefined
			},
			time: {
				h: '07',
				m: '30'
			}
		},
		rooms: [
			{
				name: "bathroom",
				tags: [],
				pictures: [],
				_p: 0
			},
			{
				name: "salon",
				tags: [],
				pictures: [],
				_p: 0
			},
			{
				name: "kitchen",
				tags: [],
				pictures: [],
				_p: 0
			}
		],
		rawh: 0,
		boxes: {
			carton: 0,
			boxes: false,
			date: {
				d: undefined,
				m: undefined,
				y: undefined
			},
			time: {
				h: undefined,
				m: undefined
			}
		},
		packing: {
			pack: false,
			sameday: true,
			date: {
				d: undefined,
				m: undefined,
				y: undefined
			},
			time: {
				h: undefined,
				m: undefined
			}
		},
		customer: {
			name: undefined,
			phone: undefined
		},
		price: {
			transportation: undefined,
			packing: undefined,
			boxes: undefined
		},
		comment: '0'
	}

	@ViewChild('camera') public camera: ElementRef
	@ViewChild('cam_frame') public cam_frame: ElementRef
	@ViewChild('photos') public photos: ElementRef
	curFiles_arr = []

	@ViewChild('item_picker') private item_picker
	@ViewChild('item_edit') private item_edit

	temp_tag = {
		tagX: 0,
		tagY: 0,
	}

	// temp_picture_id

	itemnumber = 1

	///////////////////////////// --- Rooms
	current_room = 1
	room_modal = {
		r: false,
		d: false
	}

	// ---------------------------------------------------------------------- 3

	carton_modal = false
	carton_sameday_show = true

	///////////////////////////// --- Total
	price_car = 100
	price_total = 0

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

		// setTimeout(() => {
		// 	this.canDeactivate = false
		// 	console.log('canDeactivate')
		// }, 5000)
		// console.log(this.LNG[this.lng])
	}

	ngAfterViewInit() {
		let inputs = this.acinputs['_results']
		for (let i of inputs) {
			let el = i.nativeElement
				, t = el.dataset.acit
			this.mapFormLoader(t, el)
		}
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

			this._router.navigate([this.lng, 'request'], { queryParams: { page: this.req_page } })
		})
	}

	// PAGER
	pager(dir) {
		let RP = this.req_page
		if (dir === 'N') if (RP < 3) RP++
		if (dir === 'B') if (RP > 1) RP--

		this._router.navigate([], { relativeTo: this._AR, queryParams: { page: RP } })
	}

	// ////////////////////////////////////////////////////////////////////////////////////////////
	// STEP 1 -----------------------------------------------------------------------------------//
	// ////////////////////////////////////////////////////////////////////////////////////////////

	getLift(T, F) {
		let L = this.request.adress[T].lift
			, C = {
				0: '',
				1: 'swlift--one',
				2: 'swlift--two'
			}

		if (F === 'C') return C[L]
		if (F === 'T') return this.LNG[this.lng].r1.lift[L]
	}

	mapFormLoader(t, el) {   // Initialize search elements for MapAPI
		const T = t.toUpperCase()

		this._maps.autocomplete(el, T)
			.subscribe(data => {
				Object.assign(this.request.adress[t], data)
				this.map_render_search[T] = true
				this.getDistance()
			})
	}

	COORDS() {
		return {
			OLAT: this.request.adress.o.lat,
			OLNG: this.request.adress.o.lng,
			DLAT: this.request.adress.d.lat,
			DLNG: this.request.adress.d.lng
		}
	}

	getDistance() {
		if (this.map_render_search.O && this.map_render_search.D)

			this._maps.distanceMatrix(this.COORDS())   // Get distance from MapService
				.then((data: any) => {
					if (data.status === 'ZR') return this.request.route.distance = -999

					const D = Math.floor(data.distance * 10) / 10
					this.request.route.distance = D < 1 ? 1 : D
					this.request.route.time = data.time
				})
	}

	// Дата / Время
	DTpicker(type, obj) {
		let send = {
			data: this.request[obj][type],
			flag: obj
		}
		this[type + 'Picker'].showWIDGET(send)
	}

	evDateTimeSelected(e, type) {
		this.request[e.flag][type] = e.data
		this.packingSameDayClose()
	}

	evPlaceEdited(e, type) {
		this.request.adress[type].info = e

		if (e.t === 'store') this.request.adress[type].lift = 0 // Блокируем лифт
	}

	showOnMap(T) {
		if (this.map_render_search[T]) this.gmap.showMap(T, this.COORDS())
	}

	// ////////////////////////////////////////////////////////////////////////////////////////////
	// STEP 2 -----------------------------------------------------------------------------------//
	// ////////////////////////////////////////////////////////////////////////////////////////////

	takePhoto() {
		let curFiles = this.camera.nativeElement.files
		if (curFiles.length) {
			let _CR = this.request.rooms[this.current_room]
			_CR.pictures.push(curFiles[0])
			_CR._p = 1
		}

		setTimeout(() => this._scrollCamFrame(), 100)
	}

	_scrollCamFrame() {
		let P = this.photos.nativeElement
			, _photos_width = P.scrollWidth
			, _last_img = P.children[P.children.length - 1].width

		this.cam_frame.nativeElement.scrollLeft = _photos_width - _last_img - 20
	}

	sanitize(picture: File) {
		const _url = window.URL.createObjectURL(picture)
		return this._sanitizer.bypassSecurityTrustUrl(_url)
	}

	addTag(e) {    // Press on PHOTO
		e.preventDefault()
		e.stopPropagation()

		if (e.target.parentElement.classList.contains('photos')) {
			if (!this.request.rawh) this.request.rawh = e.target.scrollHeight // rawh

			this.temp_tag.tagX = e.layerX
			this.temp_tag.tagY = e.layerY

			this.item_picker.select()
		}
	}

	evItemSelected(e) {
		const tagParams = {
			idhash: this.generateId(),
			PID: e.PID,
			IID: e.item.id,
			count: 1,
			trash: false,

			da: e.item.dap ? '0' + e.item.dap : '00'
		}

		Object.assign(this.temp_tag, tagParams)
		this.drawTag()
	}

	itemNumber(F) {
		if (F === 'null') {
			this.itemnumber = 1
			return
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
		const new_tag = Object.assign({}, this.temp_tag)
		this.request.rooms[this.current_room].tags.push(new_tag)

		// console.log(this.temp_tag)
		this.priceFurniture()
	}

	editItem(e) {
		if (e.target.dataset.id) {
			let tagToEdit = {}
			const _hash = e.target.dataset.id

			for (let _t of this.request.rooms[this.current_room].tags) {
				if (_t.idhash === _hash) {
					tagToEdit = JSON.parse(JSON.stringify(_t))
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
				if (_t[i].da) _t[i].da = etag.da

				break
			}
		}
	}

	roomPage(page) {
		const _len = this.request.rooms.length
		let _cr = this.current_room

		if (page === 'prev') this.current_room = _cr > 0 ? _cr - 1 : _len - 1
		if (page === 'next') this.current_room = _cr < _len - 1 ? _cr + 1 : 0
	}

	getRoomTitle(dir) {
		let R = this.request.rooms
			, _len = R.length
			, _cr = this.current_room
			, idx
			, LNG = this.LNG[this.lng].r2.rt
			, add
			, n

		if (dir === 'C') idx = _cr
		if (dir === 'L') idx = _cr === 0 ? _len - 1 : _cr - 1
		if (dir === 'R') idx = _cr === _len - 1 ? 0 : _cr + 1

		n = R[idx].name[0]

		add = n === 'r' ? ' ' + R[idx].name.substr(5) : ''

		return LNG[n] + add
	}

	addRoom() {
		const _id = this.request.rooms.length

		let roomToAdd = {
			name: 'room ' + (_id - 2),
			tags: [],
			pictures: [],
			_p: 0
		}

		this.request.rooms.push(roomToAdd)
		this.current_room = _id
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
	}

	resetRoom() {
		const _cr = this.request.rooms[this.current_room]
		_cr.pictures = []
		_cr.tags = []
		_cr._p = 0
		this.room_modal.r = false
	}

	roomModal(T, F) {
		// RESET
		if (T === 'r') {
			let _crp = this.request.rooms[this.current_room].pictures
			if (_crp.length) {
				if (F === 'O') this.room_modal.r = true
				if (F === 'N') this.room_modal.r = false
				if (F === 'R') this.resetRoom()
			}
			else return true
		}

		// DELETE
		if (T === 'd') {
			if (F === 'O') this.room_modal.d = true
			if (F === 'N') this.room_modal.d = false
			if (F === 'D') this.delRoom()
		}
	}

	getItemsCount(F) {
		let ROOMS = this.request.rooms
			, SUM = 0

		if (F === 'R') for (let t of ROOMS[this.current_room].tags) SUM += (1 * t.count)

		if (F === 'T')
			for (let R of ROOMS)
				for (let t of R.tags) SUM += (1 * t.count)

		return SUM
	}

	// ////////////////////////////////////////////////////////////////////////////////////////////
	// STEP 3 -----------------------------------------------------------------------------------//
	// ////////////////////////////////////////////////////////////////////////////////////////////

	cartonModal(F) {
		this.carton_modal = F
	}

	getCarton(F?) {
		const _carton = (this.request.rooms.length - 1) * 15
		if (F === 'get') return _carton
	}

	packingSameDayClose() {
		if (this.request.packing.date.d && this.request.packing.time.h) setTimeout(() => this.carton_sameday_show = false, 1000)
	}

	requestUpload(files) {
		this.xx_upload_msg = 'Отправка заявки'

		this.request.requestID = this.generateRequestID()
		this.request.xx = this.generateXX()

		const formData: any = new FormData()

		//// Готовим фото
		for (let _f of files) {
			const _fname = (_f.name[0] === 'r') ? 'r' + _f.name.slice(5) : _f.name[0]
			formData.append('_file', _f.file, _fname)
		}

		//////////////////////////////// Готовим заявку
		let requestToUpload = JSON.parse(JSON.stringify(this.request))

		// - удаляем фото
		for (let _r of requestToUpload.rooms) delete _r.pictures

		//// Добавляем параметры
		formData.append('requestObject', JSON.stringify(requestToUpload))

		//// Отправляем
		this._request.requestUpload(formData)
			.subscribe((res: any) => {
				// console.log(res)
				this.xx_loader = false
				if (res.success) {
					this.xx_upload_msg = 'Успешно отправлено'
					this.xx_download_msg = 'ПОСМОТРЕТЬ'
					this.xx_download_link = 'https://tmctestx.firebaseapp.com/en/db/' + this.request.requestID
					alert('SUCCESS')
				}
				else {
					alert('error')
				}
			})
	}

	canvasDraw() {
		// console.log(this.request)

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


	///////////////////////////////////////////////////////////////////////////////////////////////////// PRICING

	_getFloorM(T) {
		let isLift = this.request.adress[T].lift

			, count = Math.abs(+this.request.adress[T].info.f) || 0
			, multiplier = isLift ? 0.005 : 0.025
			, max = isLift ? 0.05 : 0.125

			, result = count * multiplier

		return result <= max ? result : max
	}

	priceMod() {
		let M = {
			DS: 0,
			LO: 0,
			LD: 0
		}

		// DAY
		const _d = this.request.date.date.d
		if ((_d >= 1 && _d <= 8) || (_d >= 24 && _d <= 31)) M.DS += 0.05

		// SEASON
		const _m = this.request.date.date.m
		if ((_m == 6 && _d >= 11) || (_m >= 7 && _m <= 8) || (_m == 9 && _d < 10)) M.DS += 0.05

		// LIFT
		M.LO += this._getFloorM('o')
		M.LD += this._getFloorM('d')

		return M
	}

	priceDistance() {
		let D = this.request.route.distance || 0
			, DM
			, result

		if (D >= 0 && D <= 10) DM = 7
		if (D > 10 && D <= 25) DM = 6
		if (D > 25 && D <= 50) DM = 5
		if (D > 50 && D <= 100) DM = 4
		if (D > 100) DM = 3

		result = D * DM * 1.5
		return Math.floor(result)
	}

	priceFurniture() {
		let M = this.priceMod()
			, furniture = 0

		for (let _room of this.request.rooms) {
			for (let T of _room.tags) {
				let _TP = this.FUR[T.PID % 100].types[T.IID].price // PRICE
					, _TDA = +T.da[0]
					, _TDAP = +T.da.substring(1)

				furniture += ((_TP * (T.trash ? 0.6 : 1) * (1 + M.DS + M.LO + (T.trash ? 0 : M.LD))) + (_TDA ? _TDAP : 0)) * T.count
			}
		}
		return Math.floor(furniture)
	}

	priceBoxes(F) {
		let M = this.priceMod()
			, total
			, B = this.request.boxes
			, C = B.carton
			, P = this.request.packing

		if (F === 'T') total = C * (1 + M.DS + M.LO + M.LD) * 10
		if (F === 'P') total = P.pack ? C * 20 : 0
		if (F === 'B') total = B.boxes ? C * 5 : 0

		return Math.floor(total)
	}


	priceTotal() {
		let sum = 0
			, car = this.price_car
			, distance = this.priceDistance()
			, transportation_furniture = this.priceFurniture()
			, transportation_boxes = this.priceBoxes('T')
			, packing = this.priceBoxes('P')
			, boxes = this.priceBoxes('B')
			, P = this.request.price

		sum = car + distance + transportation_furniture + transportation_boxes + packing + boxes

		if (sum < 200) sum = 200

		// else {
		// 	let _remain = Math.floor(sum) % 100
		// 	sum = _remain < 50 ? Math.floor(sum / 100) * 100 + 50 : Math.floor(sum / 100) * 100 + 100
		// }

		// SAVING
		P.transportation = car + distance + transportation_furniture + transportation_boxes
		P.packing = packing
		P.boxes = boxes

		return sum
	}

	///////////////////// VALIDATION /////////////////////

	valert(x, place) {
		let R = this.request
			, PL = R.adress[place] // PLACE

		// LOCATION
		if (x === 'R1_SL') if (PL.city && PL.street && PL.number) return true

		if (x === 'R1_PI') if (PL.info.t !== undefined) switch (PL.info.t) {
			case 'apartment':
				if (PL.info.f && PL.info.n) return true
			case 'office':
				if (PL.info.f) return true
			default:
				return true
		}

		// DAY / TIME
		if (x === 'R1_DAY') if (R.date.date.d) return true

		// DISTANCE
		if (x === 'R1_DIST') if (R.route.distance && R.route.distance !== -999) return true

		// PACKING SAMEDAY DATE / TIME
		if (x === 'R3_PSD_DT') {
			const P = R.packing
			if (P.pack && !P.sameday) return (P.date.d && P.time.h) ? true : false

			return true
		}

		// BOXES NOT DEFINED
		if (x === 'R3_BOX') return (!R.boxes.carton && (R.boxes.boxes || R.packing.pack)) ? false : true
	}

	validation(F) {
		if (F === 'price') if (true
			&& this.valert('R1_SL', 'o')
			&& this.valert('R1_PI', 'o')
			&& this.valert('R1_SL', 'd')
			&& this.valert('R1_PI', 'd')
			&& this.valert('R1_DAY', null)
			&& this.valert('R1_DIST', null)
			&& this.valert('R3_PSD_DT', null)
			&& this.valert('R3_BOX', null)
		) return true

		if (F === 'confirm') if (true
			&& this.request.customer.name
			&& this.phoneValid()
			&& this.agree_valid
		) return true
	}

	confirm() {
		// console.log(this.request)
		if (this.validation('confirm')) this.canvasDraw()
	}

	// ////////////////////////////////////////////////////////////////////////////////////////////
	// MISC - -----------------------------------------------------------------------------------//
	// ////////////////////////////////////////////////////////////////////////////////////////////

	generateRequestID() {
		let D = new Date()
			, y = D.getFullYear().toString().substr(-2)

			, _m = D.getMonth() + 1
			, m = (_m < 10 ? '0' + _m : _m).toString()

			, _d = D.getDate()
			, d = (_d < 10 ? '0' + _d : _d).toString()

			, sub1 = y + m + d
			, sub2 = this.generateXX()

		return sub1 + sub2
	}

	generateId() {
		let letters = 'abcdefghjiklmnopqrstvwxyz'
			, steps = 8
			, _string = ''

		for (let i = 0; i < steps; i++) {
			let a = Math.floor((Math.random() * letters.length))
			_string += letters[a]
		}

		return _string
	}

	generateXX() {
		let num = '1234567899'
			, _string = ''

		for (let i = 0; i < 4; i++) {
			let a = +Math.random().toString()[2]
			_string += num[a]
		}

		return +_string
	}

	showDate(T) {
		let d = this.request[T].date

		if (d.d) {
			let objDate = new Date(d.m + '/' + d.d + '/' + d.y)
				, locale = this.lng
				, D = objDate.toLocaleString(locale, { day: "2-digit" })
				, M = objDate.toLocaleString(locale, { month: "long" })
				, Y = objDate.toLocaleString(locale, { year: "2-digit" })

			return `${D} . ${M} . ${Y}`
		}

		return this.LNG[this.lng].date.datenull
	}

	showTime(T) {
		const t = this.request[T].time
		if (t.h) return t.h + ' : ' + t.m
		return this.LNG[this.lng].date.timenull
	}

	nullPack(T) {
		let PKG = this.request.packing
			, P = PKG.pack
			, S = PKG.sameday

		if (T == 'pack') if (!P) PKG.sameday = true

		if (S) {
			PKG.date.d = undefined
			PKG.date.m = undefined
			PKG.date.y = undefined
			PKG.time.h = undefined
			PKG.time.m = undefined
		}
	}

	phoneMask(e) {
		let C = this.request.customer
			, P = C.phone || ''
			, R = /[\d]/gm
			, key = e.keyCode

		if (key == 8 && P.length >= 3) return

		let _arr = ''
		for (let c of P) if (c.match(R)) _arr += c

		let A = _arr.substr(2, 1)
		let L = '05' + A

		/*                 */ C.phone = L
		if (_arr.length >= 3) C.phone = L + ' ' + _arr.substr(3, 3)
		if (_arr.length >= 6) C.phone = L + ' ' + _arr.substr(3, 3) + '-' + _arr.substr(6, 4)

		return
	}

	phoneValid() {
		let P = this.request.customer.phone || ''
		if (P.length >= 12) return true
	}

	emptyTitle(F) {
		let R = this.request.rooms
		if (F === 'C') for (let r of R) if (r.pictures.length) return true
		if (F === 'P') if (R[this.current_room].pictures.length) return true
		if (F === 'T') if (R[this.current_room].tags.length) return true
		if (F === 'I') if (R[this.current_room].tags.length > 1) return true
	}

	// timeTransform(x) {
	// 	var sec_num = parseInt(x, 10) // don't forget the second param

	// 	var hours: any = Math.floor(sec_num / 60)
	// 	var minutes: any = Math.floor((sec_num - (hours * 60)))

	// 	if (hours < 10) { hours = "0" + hours }
	// 	if (minutes < 10) { minutes = "0" + minutes }

	// 	return hours + ':' + minutes
	// }

	nextLNG() {
		let L = this.lng
		switch (L) {
			case 'en': L = 'ru'; break
			case 'ru': L = 'he'; break
			case 'he': L = 'en'; break
		}
		this._router.navigate([L, 'request'], { queryParams: { page: this.req_page } })
	}

	// detectBrowser() {
	// 	var useragent = navigator.userAgent;

	// 	if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1) {
	// 		console.log(useragent, 'PHONE')
	// 	} else {
	// 		console.log(useragent, 'NO')
	// 	}
	// }

	// aRound(X) {
	// 	return Math.floor(X * 10000) / 10000
	// }

	show() {
		console.log(this.request)
	}

}



//addTag if (e.target.parentElement.classList.contains('photos')) /* if (!e.target.classList.contains('tag')) */ {