import {
	Component,
	OnInit,
	ViewEncapsulation,
	Output,
	EventEmitter
} from '@angular/core';

import * as moment from 'moment';

@Component({
	selector: 'date-picker',
	templateUrl: './date-picker.component.html',
	styleUrls: ['./date-picker.component.sass']
})
export class DatePickerComponent implements OnInit {

	dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

	public date;
	prevMonthDate;
	public daysArr;
	public selected_day;

	show_calendar = false;

	@Output() outOnDateSelect = new EventEmitter();

	constructor() { }

	public ngOnInit() {
		this.date = moment();
		this.prevMonthDate = this.date.clone()
		this.daysArr = this.createCalendar(this.date);
	}

	showDate() {
		if (this.selected_day) {
			return this.selected_day.format('DD . MMM . YY');
		}
		return 'MM . DD . YY';
	}

	public createCalendar(month) {
		let firstDay = moment(month).startOf('M');
		let _weekDay = firstDay.weekday();
		let _month_length = month.daysInMonth();

		let days = Array.apply(null, { length: _month_length })
			.map(Number.call, Number)
			.map(n => {
				return moment(firstDay).add(n, 'd');
			});

		for (let n = 0; n < _weekDay; n++) {
			days.unshift(null);
		}

		return days;
	}

	public monthPager(dir) {
		if (dir == 'next') {
			this.date.add(1, 'M');
		}
		if (dir == 'prev') {
			if (this.checkPrev()) {
				this.date.subtract(1, 'M');
			}
		}
		this.daysArr = this.createCalendar(this.date);
	}

	checkPrev() {
		if (this.prevMonthDate.isSame(this.date)) {
			return false;
		}
		return true;
	}

	public todayCheck(day) {
		if (!day) {
			return false;
		}
		return moment().format('L') === day.format('L');
	}

	isBeforeToday(day) {
		return moment().isAfter(day, 'D');
	}

	public isSelected(day) {
		if (!day) {
			return false;
		}
		else {
			if (this.selected_day) {
				if (this.selected_day.format('L') == day.format('L')) {
					return true;
				}
			}
		}
	}

	public selectDay(e, day) {
		if (day == null || e.target.classList.contains('beforetoday')) {
			return;
		}

		this.selected_day = day;
		setTimeout(() => {
			this.hideCalendar('emit');
		}, 200);

	}

	hideCalendar(flag) {
		if (flag === 'close') {
			this.showCalendar();
		}
		if (flag === 'emit') {
			let _date = {
				m: this.selected_day.month() + 1,
				d: this.selected_day.date(),
				y: this.selected_day.year()
			}
			this.outOnDateSelect.emit(_date);
			this.showCalendar();
		}
	}

	showCalendar() {
		this.show_calendar = !this.show_calendar;
	}

	modalClick(e) {
		if (e.target.classList.contains('calendar')) {
			this.showCalendar();
		}
	}

}