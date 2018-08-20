import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { RequestService } from '../../../shared/services/request.service'
import { LNG_PACK } from '../../../shared/models/LOCALIZATION'

import * as moment from 'moment'

@Component({
	selector: 'transporterview',
	templateUrl: './transporterview.component.html',
	styleUrls: ['./transporterview.component.sass']
})
export class TransporterviewComponent implements OnInit {

	lng = undefined
	LNG = LNG_PACK

	requests: any
	requests_render = false
	day_modal = 0
	day_modal_price = 0

	/////////////////////////////////////////////////////////////////////////////// RENDER

	dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

	date
	prevMonthDate
	daysArr

	/////////////////////////////////////////////////////////////////////////////// RENDER

	OBJ = [
		'all',
		'pack',
		'box'
	]

	constructor(
		private _request: RequestService,
		private _AR: ActivatedRoute,
		private _router: Router
	) { }

	ngOnInit() {
		this._AR.params    // Получаем язык
			.subscribe(e => {
				let lng = e.lng
				this.lng = this.LNG[lng] ? lng : 'en'
				this._router.navigate([this.lng, 'me'])
			})

		this.date = moment()

		this.prevMonthDate = this.date.clone()

		this.redraw()
		this.__getRequestsByMY()
	}

	__getRequestsByMY() {
		const _query = {
			month: +this.date.format('MM'),
			year: +this.date.format('YYYY')
		}

		this._request.getRequestsByMY(_query)
			.subscribe((data: any) => {

				let O = {
					all: {},
					pack: {},
					box: {}
				}

				for (let R of data.data) {

					let OBJ: any = { all: 'date' } // Добавляем заявку в all по умолчанию

					if (R.packing.date.d) OBJ.pack = 'packing' // Если в заявке есть упаковка
					if (R.boxes.date.d) OBJ.box = 'boxes' // Если в заявке привоз коробок

					for (let T in OBJ) {
						const D = R[OBJ[T]].date // Дата в зависимости от группы назначения

						if (!O[T][D.m]) O[T][D.m] = {} // Если месяц пустой
						if (!O[T][D.m][D.d]) O[T][D.m][D.d] = [] // Если день пустой

						O[T][D.m][D.d].push(R)
					}
				}

				this.requests = O
				console.log(this.requests)

				this.requests_render = true
			})
	}

	// ГОТОВИМ ГРУППУ
	isGroup(_D) {
		if (this.requests_render && _D) {
			let M = +this.date.format('MM')
				, R = this.requests

			for (let O of this.OBJ) if (R[O][M]) if (R[O][M][_D]) return true
		}
	}

	// НАЖИМАЕМ НА ДЕНЬ
	viewDay(_D) {
		let M = +this.date.format('MM') // MONTH
			, R = this.requests

		for (let O of this.OBJ) if (R[O][M]) if (R[O][M][_D]) this.day_modal = _D
	}

	// ДЕНЬ / ПОДРОБНО
	prepareDay(__day) {
		let __arr = []
			, M = +this.date.format('MM') // MONTH
			, D = __day || this.day_modal
			, R = this.requests

		for (let O of this.OBJ) for (let _RX of R[O][M][D] || []) __arr.push(_RX)

		// Подсчитываем суммарную цену
		let TP = 0 // Total Price
		for (let r of __arr) {
			if (D != r.date.date.d) TP += this.getPrice(r, 'P')

			else
				if (r.packing.sameday) TP += this.getPrice(r, 'TOTAL')
				else TP += this.getPrice(r, 'T')
		}
		this.day_modal_price = TP


		/////////////////////////////////////////////////////////////////////////////////////////////// СОРТИРОВКА
		const OBJ = [
			'date',
			'packing',
			'boxes',
		]
		__arr.sort((a, b) => {
			let aT, bT

			// a //////////////////////////////////////////// current
			for (let O of OBJ) if (a[O].date.d === D) aT = +(a[O].time.h + a[O].time.m)

			// b //////////////////////////////////////////// next
			for (let O of OBJ) if (b[O].date.d === D) bT = +(b[O].time.h + b[O].time.m)

			if (aT < bT) return -1
			if (aT > bT) return 1

			return 0
		})

		return __arr
	}

	isMode(R, T) {
		let MODE = {
			P: 'pack',
			B: 'box'
		}
			, _M = +this.date.format('MM') // MONTH
			, _D = this.day_modal
			, _RMX = this.requests[MODE[T]][_M]

		for (let _R of _RMX[_D] || []) if (_R.requestID == R.requestID) return true
	}

	/////////////////////////////////////////////////////////////////////////////// CALENDAR

	createCalendar(month) {
		let firstDay = moment(month).startOf('M')
		let _weekDay = firstDay.weekday()
		let _month_length = month.daysInMonth()

		let days = Array.apply(null, { length: _month_length })
			.map(Number.call, Number)
			.map(n => moment(firstDay).add(n, 'd'))

		for (let n = 0; n < _weekDay; n++) days.unshift(null)

		return days
	}

	redraw() {
		this.daysArr = this.createCalendar(this.date)
	}

	monthPager(dir) {
		if (dir == 'next') {
			this.date.add(1, 'M');
		}
		if (dir == 'prev') {
			if (this.checkPrev()) {
				this.date.subtract(1, 'M');
			}
		}

		this.redraw()
	}

	checkPrev() {
		const OBJ = {
			cM: this.date.format('MM'),
			cY: this.date.format('YYYY'),
			pM: this.prevMonthDate.format('MM'),
			pY: this.prevMonthDate.format('YYYY')
		}

		if (OBJ.cM <= OBJ.pM && OBJ.cY <= OBJ.pY) return false
		return true
	}

	todayCheck(day) {
		if (!day) return false

		return moment().format('L') === day.format('L')
	}

	isBeforeToday(day) {
		return moment().isAfter(day, 'D')
	}

	/////////////////////////////////////////////////////////////////////////////// CALENDAR

	timeTransform(x) {
		let sec_num = parseInt(x, 10) // don't forget the second param
			, H: any = Math.floor(sec_num / 60)
			, M: any = Math.floor((sec_num - (H * 60)))

		if (H < 1) return M + this.LNG[this.lng].c.m
		if (M < 10) { M = "0" + M }
		return H + ':' + M
	}

	showTime(r) {
		let T = 'date'

		if (this.isMode(r, 'P')) T = 'packing'
		if (this.isMode(r, 'B')) T = 'boxes'

		let H = r[T].time.h
			, M = r[T].time.m

		return H + ' : ' + M
	}

	getPrice(R, F) {
		let PR = R.price

		if (F === 'P') return PR.packing + PR.boxes
		if (F === 'T') return PR.transportation
		if (F === 'TOTAL') return PR.transportation + PR.packing + PR.boxes
	}

	nextLNG() {
		let L = this.lng
		switch (L) {
			case 'en': L = 'ru'; break
			case 'ru': L = 'he'; break
			case 'he': L = 'en'; break
		}
		this._router.navigate([L, 'me'])
	}

}




	// selected_day

	// show_calendar = true

	// variant = undefined

// this.selected_day.format('DD . MMM . YY')

// newRequest() {
// 	this._router.navigate(['/' + this.lng, 'request'])
// }

	///////////////////////////////////////////////////////////////////////////////// SHOW

	// open() {
	// 	this.show_calendar = !this.show_calendar
	// }

// modalClick(e) {
// 	if (e.target.classList.contains('calendar')) this.open()
// }

	// isSelected(day) {
	// 	if (!day) return false

	// 	if (this.selected_day)
	// 		if (this.selected_day.format('L') == day.format('L'))
	// 			return true
	// }

	// selectDay(e, day) {
	// 	if (day == null || e.target.classList.contains('beforetoday')) return

	// 	this.selected_day = day
	// 	// setTimeout(() => {
	// 	// 	this.hideCalendar('emit')
	// 	// }, 200);
	// }

	// hideCalendar(flag) {
	// 	if (flag === 'close') {
	// 		this.open()
	// 	}
	// 	// if (flag === 'emit') {
	// 	// 	this.open()
	// 	// }
	// }

		// showCalendar(X) {
	// 	this.variant = X.flag
	// 	const __datestr = `${X.data.m}/${X.data.d}/${X.data.y}`

	// 	// Дата НЕ ВЫБРАНА
	// 	if (!X.data.d) {
	// 		this.selected_day = undefined
	// 		this.date.set('month', new Date().getMonth())
	// 	}
	// 	// Дата ВЫБРАНА
	// 	else {
	// 		this.selected_day = moment(new Date(__datestr))
	// 		this.date.set('month', X.data.m - 1)
	// 	}

	// 	this.redraw()
	// 	this.open()
	// }