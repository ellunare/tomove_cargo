import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, ElementRef, QueryList, HostListener } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'

import { DomSanitizer } from '@angular/platform-browser'

import { CanvasService } from '../../shared/services/canvas.service'
import { MapsGoogleService } from '../../shared/services/maps-google.service'
import { RequestService } from '../../shared/services/request.service'

import { LIFT_TYPES } from '../../shared/models/TYPES'
// import { FURNITURE_LIST } from '../../shared/models/FURNITURE_LIST'
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

	// @ViewChildren('aci') acinputs: QueryList<ElementRef>  //  Autocomplete Inputs
	@ViewChildren('plie') plies  //  Place Info Edits

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
			sameday: false,
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
		comment: '0',
		timestamp: undefined,
		closed: false,
		responsible: {
			transportation: undefined,
			packing: undefined
		}
	}

	FUR // = FURNITURE_LIST

	@ViewChild('item_list') public item_list: ElementRef

	@ViewChild('camera') public camera: ElementRef
	@ViewChild('cam_frame') public cam_frame: ElementRef
	@ViewChild('photos') public photos: ElementRef
	curFiles_arr = []

	@ViewChild('item_picker') private item_picker
	@ViewChild('item_editor') private item_editor

	temp_tag: any = {
		// tagX: 0,
		// tagY: 0
	}

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

	debugpriceModal = false
	adminMode = false
	coef_refresh = false

	agree_valid = false
	first_page_valid = true

	@ViewChild('canvasSS') public canvaSS: ElementRef
	xx_canvas_msg: string = ''
	xx_upload_msg: string = ''
	xx_download_link: string = ''
	xx_download_msg: string = ''
	xx_loader = false
	xx_done = false
	xx_result = 'suc'


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

	prevent = false

	// ---------------------------------------------------------------------- MISC

	constructor(
		private _maps: MapsGoogleService,
		private _request: RequestService,
		private _sanitizer: DomSanitizer,
		private _canvas: CanvasService,
		private _router: Router,
		private _AR: ActivatedRoute,
	) { }

	ngOnInit() {
		this.getLNG()
		this.initPage()
		this.getFurniture(null)

		this.__initAdmin()
	}

	ngAfterViewInit() {
		// let inputs = this.acinputs['_results']
		// for (let i of inputs) {
		// 	let el = i.nativeElement
		// 		, t = el.dataset.atype
		// 	this.mapFormLoader(t, el)
		// }
	}

	getLNG() {
		this._AR.parent.params.subscribe(params => {
			this.lng = params.lng
			// Язык не существует
			if (!this.LNG[this.lng]) setTimeout(() => this._router.navigate(['/en', 'request']), 1)
		})
	}

	initPage() {
		this._AR.queryParams.subscribe(qp => {
			if (qp.page) this.req_page = qp.page

			this._router.navigate([this.lng, 'request'], { queryParams: { page: this.req_page } })
		})
	}

	getFurniture(flag) {
		this._request.getFurniture(flag)
			.subscribe((res: any) => {
				if (res.success) this.FUR = res.data.furniture
			})
	}

	// PAGER
	pager(dir) {
		let PAGE = this.req_page
		if (dir === 'N') if (PAGE < 3) PAGE++
		if (dir === 'B') if (PAGE > 1) PAGE--

		this.first_page_valid = false
		this._router.navigate([], { relativeTo: this._AR, queryParams: { page: PAGE } })
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

	// mapFormLoader(t, el) {   // Initialize search elements for MapAPI
	// 	const T = t.toUpperCase()

	// 	this._maps.autocomplete(el, T)
	// 		.subscribe(data => {
	// 			Object.assign(this.request.adress[t], data)
	// 			this.map_render_search[T] = true

	// 			this.getDistance()
	// 			if (this.valert('R1_SL', t)) this.editPlaceInfo(t)  //  Открываем Place Info
	// 		})
	// }

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

	DTpicker(type, obj) {   // Дата / Время
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

	editPlaceInfo(T) {
		let widgets = this.plies.toArray()
		for (let w of widgets) {
			let t = w.ADDRESS_TYPE
			if (t == T) return w.showEdit(true)
		}
	}

	evPlaceEdited(e, T) {
		this.request.adress[T].info = e

		if (e.t === 'store') this.request.adress[T].lift = 0   // Блокируем лифт
	}

	showOnMap(T) {
		if (this.map_render_search[T]) this.gmap.showMap(T, this.COORDS())
	}

	selectLocation(T) {
		let INFO = JSON.parse(JSON.stringify(this.request.adress[T]))
		delete INFO.info
		delete INFO.lift

		this.gmap.selectLocation(T, INFO)
	}

	evLocationSelected(e) {
		Object.assign(this.request.adress[e.T], e.info)
	}

	// ////////////////////////////////////////////////////////////////////////////////////////////
	// STEP 2 -----------------------------------------------------------------------------------//
	// ////////////////////////////////////////////////////////////////////////////////////////////

	takePhoto() {
		let _FILE = this.camera.nativeElement.files[0]
			, ROOM = this.request.rooms[this.current_room]

		if (_FILE) {
			this._canvas.prepareCanvas([_FILE], null/*this.canvaSS.nativeElement*/, 'SINGLEFILE')
				.then(e => {
					ROOM.pictures.push(e.file)
					ROOM._p = 1
					setTimeout(() => this._scrollCamFrame(), 300)
				})
		}
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

	evItemSelected(item) {
		let tagParams: any = {
			idhash: this.generateId(),
			PID: item.PID,
			IID: item.IID,
			count: 1,
			trash: false,
		}

		if (item.da !== undefined) tagParams.da = item.da

		Object.assign(this.temp_tag, tagParams)
		this.drawTag()
	}

	tagNumber(t) {
		let H = t.idhash
			, CR = this.request.rooms[this.current_room].tags
			, i = 0

		for (let T of CR) {
			i++
			if (T.idhash === H) return i
		}
	}

	itemCount(tag) {
		if (tag.count > 1) return `${tag.count}`
		return ''
	}

	drawTag() {
		const new_tag = Object.assign({}, this.temp_tag)
		this.request.rooms[this.current_room].tags.push(new_tag)

		this.temp_tag = {} // Обнуляем TEMP Tag

		this.scrollItemList('add')
	}

	scrollItemList(F) {
		let IL = this.item_list.nativeElement
			, scrollAmount = 0

		if (F === 'page') return setTimeout(() => IL.scrollLeft += 9999, 1)

		if (F === 'add') {
			let slideTimer: any = setInterval(() => {
				scrollAmount += 100
				IL.scrollLeft += scrollAmount
				if (scrollAmount >= 1200) window.clearInterval(slideTimer)
			}, 50)
		}

	}

	editItem(e) {
		let ID = e.target.parentElement.dataset.id
		if (ID) {
			let tagToEdit = {}
				, HASH = ID
				, ROOM = this.request.rooms[this.current_room]

			for (let T of ROOM.tags)
				if (T.idhash === HASH) {
					tagToEdit = JSON.parse(JSON.stringify(T))
					break
				}

			this.item_editor.editItem(tagToEdit)
		}
	}

	evItemEdited(etag) {
		const HASH = etag.idhash
		const RT = this.request.rooms[this.current_room].tags

		for (let i = 0; i < RT.length; i++)
			if (RT[i].idhash === HASH) {

				if (etag.delete) return this.request.rooms[this.current_room].tags.splice(i, 1)

				RT[i].count = etag.count
				RT[i].trash = etag.trash
				if (RT[i].da !== undefined) RT[i].da = etag.da
				return
			}
	}

	evNewPriceSaved(e) {
		let T = e.type
		return this.FUR[e.PID].types[e.IID][T] = e.newprice   // Сохраняем локально
	}

	roomPage(page) {
		let LEN = this.request.rooms.length
			, CR = this.current_room

		if (page === 'prev') this.current_room = CR > 0 ? CR - 1 : LEN - 1
		if (page === 'next') this.current_room = CR < LEN - 1 ? CR + 1 : 0

		this.scrollItemList('page')
	}

	getRoomTitle(dir) {
		let R = this.request.rooms
			, LEN = R.length
			, CR = this.current_room
			, LNG = this.LNG[this.lng].r2.rt
			, idx
			, add
			, n

		if (dir === 'C') idx = CR
		if (dir === 'L') idx = CR === 0 ? LEN - 1 : CR - 1
		if (dir === 'R') idx = CR === LEN - 1 ? 0 : CR + 1

		n = R[idx].name[0]

		add = n === 'r' ? ' ' + R[idx].name.substr(5) : ''   // Вырезаем номер комнаты

		return LNG[n] + add
	}

	addRoom() {
		let LEN = this.request.rooms.length
			, roomToAdd = {
				name: 'room ' + (LEN - 2),
				tags: [],
				pictures: [],
				_p: 0
			}

		this.request.rooms.push(roomToAdd)
		this.current_room = LEN
	}

	delRoom() {
		this.request.rooms.splice(this.current_room, 1)

		let ROOMS = this.request.rooms
		if (ROOMS.length > 2)
			for (let i = 3; i < ROOMS.length; i++)
				ROOMS[i].name = 'room ' + (i - 2)

		this.current_room--
		this.room_modal.d = false
	}

	resetRoom() {
		let CR = this.request.rooms[this.current_room]
		CR.pictures = []
		CR.tags = []
		CR._p = 0
		this.room_modal.r = false
	}

	roomModal(T, F) {
		// RESET
		if (T === 'r') {
			let CRP = this.request.rooms[this.current_room].pictures
			if (CRP.length) {
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

		if (F === 'R')
			for (let t of ROOMS[this.current_room].tags) SUM += (1 * t.count)

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

	cartonNumber(F) {
		let B = this.request.boxes
			, C = +B.carton
			, R = /[\d]/gm

		if (F === 'F') if (!C) B.carton = undefined
		if (F === 'B') if (!C || C < 0 || !(C.toString().match(R))) B.carton = 0
	}


	packingSameDayClose() {
		if (this.request.packing.date.d && this.request.packing.time.h) setTimeout(() => this.carton_sameday_show = false, 1000)
	}

	requestUpload(files) {
		this.xx_upload_msg = 'Отправка заявки'

		this.request.requestID = this.generateRequestID()
		this.request.xx = this.generateXX()
		this.request.timestamp = new Date().toUTCString()

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
				// this.xx_loader = false
				if (res.success) {
					// this.xx_upload_msg = 'Успешно отправлено'
					// this.xx_download_msg = 'ПОСМОТРЕТЬ'
					// this.xx_download_link = 'https://tmctestx.firebaseapp.com/' + this.lng + '/db/' + this.request.requestID
					// alert('SUCCESS')
					this.xx_result = 'suc'
					this.xx_done = true
				}
				else {
					// alert('error')
					this.xx_result = 'err'
				}
			})
	}

	canvasDraw() {
		// console.log(this.request)

		this.xx_loader = true
		// this.xx_canvas_msg = 'Обработка изображений'

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
				let _promise = this._canvas.prepareCanvas(_c.pictures, /*this.canvaSS.nativeElement*/null, _c.name)
				canvas_arr.push(_promise)
			}
		}

		Promise.all(canvas_arr).then(result_files => {
			this.requestUpload(result_files)
		})

	}


	///////////////////////////////////////////////////////////////////////////////////////////////////// PRICING

	_getFloorM(T) {
		let isLift = this.request.adress[T].lift

			, count = Math.abs(+this.request.adress[T].info.f) || 0
			, multiplier = isLift ? 0.005 : 0.025
			, max = isLift ? 0.05 : 0.2

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

	roundPrice(P) {
		let T = Math.round(P / 10) * 10
			, D = T % 10
		return T + (D == 0 ? 0 : 10)
	}

	priceDistance() {
		let D = this.request.route.distance || 0
			, DM
			, price

		if (D >= 0 && D <= 10) DM = 7
		if (D > 10 && D <= 25) DM = 6
		if (D > 25 && D <= 50) DM = 5
		if (D > 50 && D <= 100) DM = 4
		if (D > 100) DM = 3

		price = D * DM * 1.5
		return this.roundPrice(price)
	}

	priceFurniture() {
		let M = this.priceMod()
			, furniture = 0
			, COEF = 1 + this.FUR[0].misc.coef / 100

		for (let _room of this.request.rooms)
			for (let T of _room.tags) {
				let _TP = this.FUR[T.PID % 100].types[T.IID].price // PRICE
					, _TDA = +T.da
					, _TDAP = this.FUR[T.PID % 100].types[T.IID].dap

				furniture += ((_TP * (T.trash ? 0.6 : 1) * (1 + M.DS + M.LO + (T.trash ? 0 : M.LD))) + (_TDA ? _TDAP : 0)) * T.count * COEF
			}

		return this.roundPrice(furniture)
	}

	priceBoxes(F) {
		let M = this.priceMod()
			, total
			, B = this.request.boxes
			, C = B.carton || 0
			, P = this.request.packing

		if (F === 'T') total = this.roundPrice(C * (1 + M.DS + M.LO + M.LD) * 10)
		if (F === 'P') total = P.pack ? C * 20 : 0
		if (F === 'B') total = B.boxes ? C * 5 : 0

		return total
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

		// SAVING
		P.transportation = car + distance + transportation_furniture + transportation_boxes
		P.packing = packing
		P.boxes = boxes

		return sum
	}

	__showPriceDebug() {
		this.debugpriceModal = !this.debugpriceModal
	}

	__coefRefresh() {
		this.coef_refresh = true
		this._request.getFurniture('coef')
			.subscribe((res: any) => {
				if (res.success) this.FUR[0].misc.coef = res.data
				this.coef_refresh = false
			})
	}

	///////////////////// VALIDATION /////////////////////

	valert(x, place) {
		let R = this.request
			, PL = R.adress[place]  // PLACE

		// LOCATION
		if (x === 'R1_SL') if (PL.city && PL.street && PL.number) return true

		// PLACE INFO
		if (x === 'R1_PI') {
			let I = PL.info
				, T = I.t ? I.t[0] : undefined  // First letter

			if (T === 'a') if (I.f && I.n) return true
			if (T === 'o' || T === 'h') if (I.f) return true
			if (T === 's') return true
		}

		// DAY / TIME
		if (x === 'R1_DAY') if (R.date.date.d) return true

		// DISTANCE
		if (x === 'R1_DIST') if (R.route.distance && R.route.distance !== -999) return true

		// PACKING SAMEDAY DATE / TIME
		if (x === 'R3_PSD_DT') {
			let P = R.packing
			if (P.pack && !P.sameday) return (P.date.d && P.time.h) ? true : false

			return true
		}

		// BOXES NOT DEFINED
		if (x === 'R3_BOX') return (!R.boxes.carton && (R.boxes.boxes || R.packing.pack)) ? false : true
	}

	backToValidate() {
		this.first_page_valid = false
		this.req_page = 1
		this._router.navigate([this.lng, 'request'], { queryParams: { page: this.req_page } })
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
		// this.xx_loader = true
		// this.xx_result = 'suc'
		// setTimeout(() => this.xx_done = true, 3000)
		// console.log(this.request)
		if (this.validation('confirm')) this.canvasDraw()
	}

	sendOK() {
		if (this.xx_result == 'err') window.location.assign('https://tomove.co/')

		if (this.xx_done && this.xx_result != 'err') {
			// this.xx_loader = false
			// this.xx_done = false
			// this.xx_result = 'err'
			window.location.assign('https://tomove.co/')
		}
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

	// showDate(T) {
	// 	let d = this.request[T].date

	// 	if (d.d) {
	// 		let objDate = new Date(d.m + '/' + d.d + '/' + d.y)
	// 			, locale = this.lng
	// 			, D = objDate.toLocaleString(locale, { day: "2-digit" })
	// 			, M = objDate.toLocaleString(locale, { month: "long" })
	// 			, Y = objDate.toLocaleString(locale, { year: "2-digit" })

	// 		return D + ' . ' + M + ' . ' + Y
	// 	}

	// 	return this.LNG[this.lng].date.datenull
	// }

	showDatePart(T, X) {
		return this.request[T].date[X] || this.LNG[this.lng].date.datenull[X]
	}

	showMonth(T) {
		if (!this.request[T].date.d) return this.LNG[this.lng].date.datenull.m

		let objDate = new Date(this.request[T].date.m + '/' + this.request[T].date.d + '/' + this.request[T].date.y)
			, locale = this.lng
			, M = objDate.toLocaleString(locale, { month: "short" })

		return M
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

		if (T == 'pack') {
			if (!P) PKG.sameday = false // true
			this.carton_sameday_show = P
		}

		if (!S) {
			PKG.date.d = undefined
			PKG.date.m = undefined
			PKG.date.y = undefined
			PKG.time.h = undefined
			PKG.time.m = undefined
		}
		else setTimeout(() => { if (this.request.packing.sameday) this.carton_sameday_show = false }, 1500)
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

	sideLNG(dir) {
		let L = this.lng
			, OBJ = {
				'en': 1,
				'ru': 2,
				'he': 3
			}
			, A = ['he', 'en', 'ru', 'he', 'en']
		return A[OBJ[L] + dir]
	}

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

	__initAdmin() {
		if (localStorage.getItem('_xad')) this.adminMode = true
	}

	__isAdmin() {
		return this.adminMode
	}

	aRound(X) {
		return Math.round(X * 10000) / 10000
	}

	show() {
		console.log(this.request.rooms)
	}

	TS(e) {
		if (e.touches.length !== 1) return

		var scrollY = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
		this.prevent = (scrollY === 0)
	}

	TM(e) {
		if (this.prevent) {
			this.prevent = false
			e.preventDefault()
			return
		}
	}

}



//addTag if (e.target.parentElement.classList.contains('photos')) /* if (!e.target.classList.contains('tag')) */ {