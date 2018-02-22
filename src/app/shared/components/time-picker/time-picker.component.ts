import {
	Component,
	OnInit,
	Output,
	EventEmitter
} from '@angular/core';

import * as moment from 'moment';

@Component({
	selector: 'time-picker',
	templateUrl: './time-picker.component.html',
	styleUrls: ['./time-picker.component.sass']
})
export class TimePickerComponent implements OnInit {

	hours = [];
	minutes = [];

	@Output() outTimePicked = new EventEmitter();

	select_hour;
	select_minute;

	show_time = false; // false
	show_H = false;
	show_M = false;

	first_run_H = false;
	first_run_M = false;

	constructor() { }

	ngOnInit() {
		this.initTime();
	}

	initTime() {
		const h_start = 0;
		const h_end = 23;

		const m_start = 0;
		const m_end = 60;
		const m_step = 10;

		for (let i = h_start; i <= 23; i++) {
			this.hours.push(i);
		}

		for (let i = m_start; i < m_end; i += m_step) {
			this.minutes.push(i);
		}
	}

	showTime() {
		if (this.select_hour && this.select_minute) {
			return this.select_hour + ' : ' + this.select_minute;
		}
		return 'HH:MM';
	}

	getTimeValue(flag) {
		if (flag === 'H') {
			if (this.select_hour) {
				return this.select_hour;
			}
			return 'HH';
		}
		if (flag === 'M') {
			if (this.select_minute) {
				return this.select_minute;
			}
			return 'MM';
		}
	}

	selectTime(e, type) {
		const num = +e.target.innerText

		if (type === 'H') {
			this.select_hour = num;
			setTimeout(() => {
				this.showElement('H');
				this.closeAfterSelect();
			}, 200)
		}
		if (type === 'M') {
			this.select_minute = num;
			setTimeout(() => {
				this.showElement('M');
				this.closeAfterSelect();
			}, 200)
		}
	}

	// Закрываем автоматически после выбора
	closeAfterSelect() {
		// если выбрали и часы и минуты
		if (this.select_hour && this.select_minute) {
			// если изменены оба поля
			if (!this.first_run_H && !this.first_run_M) {
				this.showTimeBlock();
			}
		}
	}


	// hideTimeBlock(flag) {
	//   if (flag === 'close') {
	//     console.log('just close');
	//     this.showTimeBlock();
	//   }
	//   if (flag === 'emit') {
	//     console.log('emit time selected');
	//     // let _date = this.selected_day.format('L');
	//     // this.outOnDateSelect.emit(_date);
	//     this.showTimeBlock();
	//   }
	// }

	showTimeBlock() {
		this.show_time = !this.show_time;
		// Открываем после закрытия
		if (this.show_time) {
			this.first_run_H = true;
			this.first_run_M = true;
		}
		// При закрытии
		else {
			if (this.select_hour && this.select_minute) {
				let _time = {
					h: this.select_hour,
					m: this.select_minute
				}
				this.outTimePicked.emit(_time);
			}
		}
	}

	showElement(type) {
		if (type === 'H') {
			this.show_H = !this.show_H;
			// Если закрыли значит выбрали
			if (!this.show_H) {
				this.first_run_H = false;
			}
		}
		if (type === 'M') {
			this.show_M = !this.show_M;
			// Если закрыли значит выбрали
			if (!this.show_M) {
				this.first_run_M = false;
			}
		}
	}

	modalClick(e, cl_name, toclose) {
		e.stopPropagation();
		if (e.target.classList.contains(cl_name)) {
			if (toclose === 'B') {
				this.showTimeBlock();
			}
			if (toclose === 'H') {
				this.showElement('H');
			}
			if (toclose === 'M') {
				this.showElement('M');
			}
		}
	}

}
