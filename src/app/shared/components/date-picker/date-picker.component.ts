import {
	Component,
	OnInit,
	ViewEncapsulation,
	Output,
	EventEmitter
} from '@angular/core';

// import {
// 	FormBuilder,
// 	FormControl,
// 	FormGroup,
// 	Validators
// } from '@angular/forms';

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

	// public isReserved = null;
	// public dateForm: FormGroup;

	constructor(/*private fb: FormBuilder*/) {
		// this.initDateRange();
	}

	// public initDateRange() {
	// 	return (this.dateForm = this.fb.group({
	// 		dateFrom: [null, Validators.required],
	// 		dateTo: [null, Validators.required]
	// 	}));
	// }

	public ngOnInit() {
		this.date = moment();
		this.prevMonthDate = this.date.clone()
		this.daysArr = this.createCalendar(this.date);
	}

	showDate() {
		if (this.selected_day) {
			return this.selected_day.format('L');
		}
		return 'MM/DD/YYYY';
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

	// public reserve() {
	// 	if (!this.dateForm.valid) {
	// 		return;
	// 	}
	// 	let dateFromMoment = this.dateForm.value.dateFrom;
	// 	let dateToMoment = this.dateForm.value.dateTo;
	// 	this.isReserved = `Reserved from ${dateFromMoment} to ${dateToMoment}`;
	// }

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

		// let dateFromMoment = moment(this.dateForm.value.dateFrom, 'MM/DD/YYYY');
		// let dateToMoment = moment(this.dateForm.value.dateTo, 'MM/DD/YYYY');
		// if (this.dateForm.valid) {
		// 	return (
		// 		dateFromMoment.isSameOrBefore(day) && dateToMoment.isSameOrAfter(day)
		// 	);
		// }
		// if (this.dateForm.get('dateFrom').valid) {
		// 	return dateFromMoment.isSame(day);
		// }
	}

	public selectDay(e, day) {
		if(day != null) {
			this.selected_day = day;
			setTimeout(() => {
				this.hideCalendar('emit');
			}, 200)
		}

		// this.selected_day = day["_d"];
		// let dayFormatted = day.format('MM/DD/YYYY');

		// console.log(this.selected_day);
		// console.log(day["_d"]);
		// console.log();

		// if (this.dateForm.valid) {
		// 	this.dateForm.setValue({ dateFrom: null, dateTo: null });
		// 	return;
		// }
		// if (!this.dateForm.get('dateFrom').value) {
		// 	this.dateForm.get('dateFrom').patchValue(dayFormatted);
		// } else {
		// 	this.dateForm.get('dateTo').patchValue(dayFormatted);
		// }
	}

	hideCalendar(flag) {
		if (flag === 'close') {
			console.log('just close');
			this.showCalendar();
		}
		if (flag === 'emit') {
			console.log('emit date selected');
			// let _date = this.selected_day.format('L');
			let _date = {
				m: this.selected_day.month(),
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