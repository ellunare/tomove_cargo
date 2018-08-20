import {
	Component,
	OnInit,
	ViewEncapsulation,
	Output,
	EventEmitter,
	Input
} from '@angular/core'

import { LNG_PACK } from '../../models/LOCALIZATION'

import * as moment from 'moment'

@Component({
	selector: 'date-picker',
	templateUrl: './date-picker.component.html',
	styleUrls: ['./date-picker.component.sass']
})
export class DatePickerComponent implements OnInit {

	@Input() lng = undefined
	LNG = LNG_PACK

	dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

	date
	prevMonthDate
	daysArr
	selected_day

	show_calendar = false

	variant = undefined

	@Output() outOnDatePicked = new EventEmitter()

	constructor() { }

	ngOnInit() {
		this.date = moment()
		this.prevMonthDate = this.date.clone()
		this.redraw()
	}

	createCalendar(month) {
		let firstDay = moment(month).startOf('M')
			, _weekDay = firstDay.weekday()
			, _month_length = month.daysInMonth()

			, days = Array.apply(null, { length: _month_length })
				.map(Number.call, Number)
				.map(n => moment(firstDay).add(n, 'd'))

		for (let n = 0; n < _weekDay; n++) days.unshift(null)

		return days
	}

	redraw() {
		this.daysArr = this.createCalendar(this.date)
	}

	monthPager(dir) {
		if (dir == 'next') this.date.add(1, 'M')
		if (dir == 'prev') if (this.checkPrev()) this.date.subtract(1, 'M')

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

	isSelected(day) {
		if (!day) return false
		else
			if (this.selected_day)
				if (this.selected_day.format('L') == day.format('L')) return true
	}

	selectDay(e, day) {
		if (day == null || e.target.classList.contains('beforetoday')) return

		this.selected_day = day
		setTimeout(() => this.hideCalendar('emit'), 200);
	}

	hideCalendar(flag) {
		if (flag === 'close') this.open()

		if (flag === 'emit') {
			let __send = {
				data: {
					m: this.selected_day.month() + 1,
					d: this.selected_day.date(),
					y: this.selected_day.year()
				},
				flag: this.variant
			}
			this.outOnDatePicked.emit(__send)
			this.open()
		}
	}

	///////////////////////////////////////////////////////////////////////////////// SHOW
	showWIDGET(X) {
		this.variant = X.flag
		const __datestr = `${X.data.m}/${X.data.d}/${X.data.y}`

		// Дата НЕ ВЫБРАНА
		if (!X.data.d) {
			this.selected_day = undefined
			this.date.set('month', new Date().getMonth())
		}
		// Дата ВЫБРАНА
		else {
			this.selected_day = moment(new Date(__datestr))
			this.date.set('month', X.data.m - 1)
		}

		this.redraw()
		this.open()
	}

	open() {
		this.show_calendar = !this.show_calendar
	}

	modalClick(e) {
		if (e.target.classList.contains('calendar')) this.open()
	}

}

// this.selected_day.format('DD . MMM . YY')
