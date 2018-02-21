import {
	Component,
	OnInit,
	ViewEncapsulation
} from '@angular/core';

import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators
} from '@angular/forms';

import * as moment from 'moment';

@Component({
	selector: 'date-picker',
	templateUrl: './date-picker.component.html',
	styleUrls: ['./date-picker.component.sass']
})
export class DatePickerComponent implements OnInit {

	dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

	public date = moment();
	public dateForm: FormGroup;

	public isReserved = null;

	public daysArr;

	constructor(private fb: FormBuilder) {
		this.initDateRange();
	}

	public initDateRange() {
		return (this.dateForm = this.fb.group({
			dateFrom: [null, Validators.required],
			dateTo: [null, Validators.required]
		}));
	}

	public ngOnInit() {
		this.daysArr = this.createCalendar(this.date);
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

	public nextMonth() {
		this.date.add(1, 'M');
		this.daysArr = this.createCalendar(this.date);
	}

	public previousMonth() {
		this.date.subtract(1, 'M');
		this.daysArr = this.createCalendar(this.date);
	}

	public todayCheck(day) {
		if (!day) {
			return false;
		}
		return moment().format('L') === day.format('L');
	}

	public reserve() {
		if (!this.dateForm.valid) {
			return;
		}
		let dateFromMoment = this.dateForm.value.dateFrom;
		let dateToMoment = this.dateForm.value.dateTo;
		this.isReserved = `Reserved from ${dateFromMoment} to ${dateToMoment}`;
	}

	public isSelected(day) {
		if (!day) {
			return false;
		}
		let dateFromMoment = moment(this.dateForm.value.dateFrom, 'MM/DD/YYYY');
		let dateToMoment = moment(this.dateForm.value.dateTo, 'MM/DD/YYYY');
		if (this.dateForm.valid) {
			return (
				dateFromMoment.isSameOrBefore(day) && dateToMoment.isSameOrAfter(day)
			);
		}
		if (this.dateForm.get('dateFrom').valid) {
			return dateFromMoment.isSame(day);
		}
	}

	public selectedDate(day) {
		let dayFormatted = day.format('MM/DD/YYYY');
		if (this.dateForm.valid) {
			this.dateForm.setValue({ dateFrom: null, dateTo: null });
			return;
		}
		if (!this.dateForm.get('dateFrom').value) {
			this.dateForm.get('dateFrom').patchValue(dayFormatted);
		} else {
			this.dateForm.get('dateTo').patchValue(dayFormatted);
		}
	}
}