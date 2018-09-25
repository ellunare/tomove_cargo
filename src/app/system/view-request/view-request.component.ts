import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { RequestService } from '../../shared/services/request.service'

import { ActivatedRoute, Router } from '@angular/router'
import { Location } from '@angular/common'

import { LNG_PACK } from '../../shared/models/LOCALIZATION'
// import { FURNITURE_LIST } from '../../shared/models/FURNITURE_LIST'
import { DomSanitizer } from '@angular/platform-browser'


@Component({
	selector: 'view-request',
	templateUrl: './view-request.component.html',
	styleUrls: ['./view-request.component.sass']
})
export class ViewRequestComponent implements OnInit {

	lng = undefined
	LNG = LNG_PACK

	admin: boolean = false
	edit = false

	request: any

	access = false

	temp_access: string = undefined
	temp_correct_code: boolean = true

	temp_closed = false

	ADRESSES = ['o', 'd']

	placeItems = [
		'e',
		'f',
		'n'
	]

	copy = {
		f: false,
		p: false,
		m: false
	}

	remove = false
	repack = false
	nullBoxesDateFlag = false

	@ViewChild('gmap') private gmap
	@ViewChild('datePicker') private datePicker
	@ViewChild('timePicker') private timePicker

	FUR = undefined // = FURNITURE_LIST

	constructor(
		private _request: RequestService,
		private _AR: ActivatedRoute,
		private _router: Router,
		private sanitizer: DomSanitizer,

		private location: Location
	) { }

	ngOnInit() {
		this._AR.data    // Получение объявления от резолвера
			.subscribe(data => {
				this.request = data.request

				if (this.request.comment === '0') this.request.comment = '' // Обнуляем коммент
				console.log('----------', this.request)
			})

		this._AR.queryParams    // Получаем query параметры
			.subscribe(e => {
				if (e.p) this.repack = true
				if (e.m) this.remove = true
			})

		this._AR.pathFromRoot[1].params    // Получаем язык
			.subscribe(e => {
				let lng = e.lng
					, qp = this.getQP('O')

				this.lng = this.LNG[lng] ? lng : 'en'

				this._router.navigate([this.lng, 'db', this.request.requestID], { queryParams: qp })
			})

		this.getFurniture(null)

		this.initAccess()

		if (localStorage.getItem('_xad')) {
			this.admin = true
			if (this.repack || this.remove) this.admin = false
		}

	}

	getFurniture(flag) {
		this._request.getFurniture(flag)
			.subscribe((res: any) => {
				if (res.success) this.FUR = res.data.furniture
			})
	}

	initAccess() {
		const A = localStorage.getItem('ac')
		if (A === this.request.xx.toString()) this.access = true
	}

	getPhoto(r) {
		const baseURL = 'https://tmctestrequests.s3.amazonaws.com/requests/' + this.request.requestID + '/'
		const N = r.name[0]
		let rAdd = (N === 'r') ? r.name.slice(5) : ''

		return baseURL + N + rAdd + '.jpg'
	}

	getTagCoords(tag, roomimg, C) {
		// console.log(tag)
		// const H = 400
		const H = roomimg.clientHeight

		return (H * tag['tag' + C]) / this.request.rawh - 10
	}

	getAccess() {
		const access = this.access || this.admin
		return access
	}

	setAccess() {
		localStorage.setItem('ac', this.temp_access.toString())
		this.temp_access = undefined
		this.access = true
	}

	checkAccess(e) {
		const V = e.target.value
		this.temp_correct_code = true

		if (V.length == 4) {
			if (V === this.request.xx.toString()) this.setAccess()
			else this.temp_correct_code = false
		}
	}

	quit() {
		localStorage.removeItem('ac')
		this.access = false
	}

	deleteRequest() {
		const _confirm = confirm('DELETE REQUEST?')
		if (_confirm)
			this._request.deleteRequest(this.request.requestID)
				.subscribe((res: any) => {
					alert(res.msg)
					if (res.success) this._router.navigate(['/en', 'me'])
				})
	}

	updateRequest() {
		const _confirm = confirm('SAVE CHANGES?')
		if (_confirm) {
			let body = {
				date: this.request.date.date,
				time: this.request.date.time,
				price: this.request.price,

				pack_date: this.request.packing.date,
				pack_time: this.request.packing.time,

				boxes_date: this.request.boxes.date,
				boxes_time: this.request.boxes.time,
				nullBoxesDate: this.nullBoxesDateFlag,

				comment: this.request.comment,

				responsible: {
					transportation: this.request.responsible.transportation,
					packing: this.request.responsible.packing
				}
			}

			this._request.updateRequest(this.request.requestID, body)
				.subscribe((res: any) => {
					alert(res.msg)
					if (res.success) this._edit()
				})
		}
	}

	closeRequest() {
		let TC = this.temp_closed
			, action = !this.request.closed

		if (!TC) {
			this.temp_closed = true
			let body = { action: action }

			this._request.closeRequest(this.request.requestID, body)
				.subscribe((res: any) => {
					if (res.success) this.request.closed = res.data.action
					this.temp_closed = false
				})
		}
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
	}

	/////////////////////////////////////////////////////////////////// MISC

	render(F, T, X) {
		let AI = this.request.adress[T].info
		// Полупрозрачный если нет значения
		if (F === 'items') if (AI[X]) return true

		// Виден этаж если есть значение
		if (F === 'value') if (!this.getAccess() && (X === 'e' || X === 'n' || (X === 'f' && !AI['f']))) return true

		// Не виден если дом или склад
		if (F === 'store') if (this.request.adress[T].info.t === 'store') return true
	}

	// showSwipe(roomimg) {
	// 	console.log(roomimg)
	// }

	lift(T, F) {
		let LIFT = this.request.adress[T].lift
			, L = this.LNG[this.lng].r1.lift
			, O = {
				T: {
					0: L[0],
					1: L[1],
					2: L[2]
				},
				C: {
					0: 'lift--no',
					1: 'lift--one',
					2: 'lift--two'
				}
			}
		return O[F][LIFT]
	}

	showDatePart(type, X) {
		let T = type
		if (this.repack) T = 'packing'

		return this.request[T].date[X]
	}

	showMonth(type) {
		let T = type
		if (this.repack) T = 'packing'

		let objDate = new Date(this.request[T].date.m + '/' + this.request[T].date.d + '/' + this.request[T].date.y)
			, locale = this.lng
			, month = objDate.toLocaleString(locale, { month: "long" })

		return month
	}

	showDate(T) {
		let d = this.request[T].date
			, objDate = new Date(d.m + '/' + d.d + '/' + d.y)
			, locale = this.lng
			, D = objDate.toLocaleString(locale, { day: "2-digit" })
			, M = objDate.toLocaleString(locale, { month: "long" })
			, Y = objDate.toLocaleString(locale, { year: "2-digit" })

		if (!d.d) return 'DD . MM . YY'

		return `${D} . ${M} . ${Y}`
	}

	showTime(X) {
		const T = this.request[X].time
		if (!T.h) return 'HH : MM'

		return T.h + ' : ' + T.m
	}

	timeTransform(x) {
		var sec_num = parseInt(x, 10) // don't forget the second param

		var H: any = Math.floor(sec_num / 60)
		var M: any = Math.floor((sec_num - (H * 60)))
		if (H < 1) return M + this.LNG[this.lng].c.m

		if (M < 10) { M = "0" + M }
		return H + ':' + M
	}

	getPrice(F) {
		let RP = this.request.price
		if (F === 'P') return RP.packing + RP.boxes
		if (F === 'T') return RP.transportation

		if (F === 'TOTAL') return (this.repack ? 0 : RP.transportation) + (this.remove ? 0 : RP.packing) + (this.request.boxes.boxes ? RP.boxes : 0)

		if (F === 'VAT') return Math.floor(0.17 * this.getPrice('TOTAL'))
	}

	getRoomName(name) {
		let n = name[0]
			, add = n === 'r' ? ' ' + name.substr(5) : ''
			, NAME = this.LNG[this.lng].r2.rt

		return NAME[n] + add
	}

	getRoomItemsCount(R) {
		let S = 0
		for (let i of R.tags) S += i.count
		return S
	}

	showOnMap() {
		const COORDS = {
			OLAT: this.request.adress.o.lat,
			OLNG: this.request.adress.o.lng,
			DLAT: this.request.adress.d.lat,
			DLNG: this.request.adress.d.lng
		}
		if (this.getAccess()) this.gmap.showMap('R', COORDS)
	}

	wazeLink(T) {
		const link = 'waze://?ll=' + this.request.adress[T].lat + ',' + this.request.adress[T].lng + '&navigate=yes'
		return this.sanitizer.bypassSecurityTrustUrl(link)
	}

	_edit() {
		this.edit = !this.edit

		if (!this.edit) this.nullBoxesDateFlag = false // Флаг обнуления даты коробок
	}

	nullBoxesDate() {
		let BD = this.request.boxes.date
			, BT = this.request.boxes.time

		for (let T in BD) BD[T] = undefined
		for (let T in BT) BT[T] = undefined

		this.nullBoxesDateFlag = true
	}

	phonePrepare() {
		let P = this.request.customer.phone
		return P.split(/[+\s-]/).join('')
	}

	getTimeStamp() {
		let TS = this.request.timestamp

		if (!TS) return ''
		let D = new Date(TS)
			, H: any = D.getHours()
			, M: any = D.getMinutes()

		M = (M < 10 ? '0' : '') + M

		return H + ':' + M
	}

	// show(e) {
	// 	console.log(e.target.value)
	// }

	getQP(F) {
		let qp: any = {}
		if (this.repack) qp.p = 1
		if (this.remove) qp.m = 1

		if (F === 'O') return qp
		if (F === 'S') for (let k in qp) return '?' + k + '=1'
	}

	nextLNG() {
		let L = this.lng
			, qp = this.getQP('S') || ''

		switch (L) {
			case 'en': L = 'ru'; break
			case 'ru': L = 'he'; break
			case 'he': L = 'en'; break
		}
		this.lng = L
		this.location.go(this.lng + '/db/' + this.request.requestID + qp)
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////// LINK

	copyToCB(flag) {

		const add = {
			f: '',
			p: '?p=1',
			m: '?m=1'
		}

		const str = 'https://tmctestx.firebaseapp.com/en/db/' + this.request.requestID + add[flag[0]]

		const iOS = navigator.platform.match(/ipad|ipod|iphone/i)

		let c____: any = document.createElement('textarea')
		c____.value = str
		c____.style = { position: 'absolute', left: '-9999px' }
		document.body.appendChild(c____)

		// iOS
		if (iOS) {
			var editable = c____.contentEditable
			var readOnly = c____.readOnly
			c____.contentEditable = true
			c____.readOnly = true

			var range = document.createRange()
			range.selectNodeContents(c____)

			var selection = window.getSelection()
			selection.removeAllRanges()
			selection.addRange(range)
			c____.setSelectionRange(0, 999999)

			c____.contentEditable = editable
			c____.readOnly = readOnly
		}
		// Chrome
		else {
			c____.select()
		}

		document.execCommand('copy')
		document.body.removeChild(c____)

		this.linkCopied(flag[0])
	}

	linkCopied(T) {
		this.copy[T] = true
		setTimeout(() => {
			this.copy[T] = false
		}, 2000)
	}

}
