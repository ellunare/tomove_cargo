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

	select_H = '08';
	select_M = '00';

	show_time = false;
	show_H = false;
	show_M = false;

	first_run_H = false;
	first_run_M = false;

	constructor() { }

	ngOnInit() {
		this.initTime();


		////////////////////
		let _time = {
			h: +this.select_H,
			m: +this.select_M
		}
		// Отдаем НАВЕРХ (strings)
		this.outTimePicked.emit(_time);
	}

	// Создаем диапазон выбора часов и минут
	initTime() {
		const z = '0';
		const n = '';

		const h_start = 0;
		const h_end = 23;

		const m_start = 0;
		const m_end = 60;
		const m_step = 10;

		for (let i = h_start; i <= h_end; i++) {
			let add;
			if (i < 10) {
				add = z;
			}
			else {
				add = n;
			}
			this.hours.push(`${add}${i}`);
		}

		for (let i = m_start; i < m_end; i += m_step) {
			let add;
			if (i < 10) {
				add = z;
			}
			else {
				add = n;
			}
			this.minutes.push(`${add}${i}`);
		}
	}

	// Вывод на табло
	showTime() {
		if (this.timeValid()) {
			return this.select_H + ' : ' + this.select_M;
		}
		return 'HH:MM';
	}

	// Вывод в ячейку parent
	getTimeValue(flag) {
		if (flag === 'H') {
			if (this.select_H != undefined) {
				return this.select_H;
			}
			return 'HH';
		}
		if (flag === 'M') {
			if (this.select_M != undefined) {
				return this.select_M;
			}
			return 'MM';
		}
	}

	// Клик по ячейке
	selectTime(e, type) {
		const num = e.target.innerText

		if (type === 'H') {
			this.select_H = num;
			setTimeout(() => {
				this.showElement('H');
				this.closeAfterSelect();
			}, 200)
		}
		if (type === 'M') {
			this.select_M = num;
			setTimeout(() => {
				this.showElement('M');
				this.closeAfterSelect();
			}, 200)
		}
	}

	// Закрываем автоматически после выбора
	closeAfterSelect() {
		// если выбраны и часы и минуты
		if (this.timeValid()) {
			// и если изменены оба поля
			if (!this.first_run_H && !this.first_run_M) {
				this.showTimeBlock();
			}
		}
	}

	showTimeBlock() {
		this.show_time = !this.show_time;
		// Открываем после закрытия
		if (this.show_time) {
			this.first_run_H = true;
			this.first_run_M = true;
		}
		// При закрытии
		else {
			// если выбраны и часы и минуты
			if (this.timeValid()) {
				let _time = {
					h: +this.select_H,
					m: +this.select_M
				}
				// Отдаем НАВЕРХ (strings)
				this.outTimePicked.emit(_time);
			}
		}
	}

	//  Открытие окна выбора часов или минут
	showElement(type) {
		if (type === 'H') {
			this.show_H = !this.show_H;
			// Окно открывалось? -> при закрытии меняем флаг
			if (!this.show_H) {
				this.first_run_H = false;
			}
		}
		if (type === 'M') {
			this.show_M = !this.show_M;
			// Окно открывалось? -> при закрытии меняем флаг
			if (!this.show_M) {
				this.first_run_M = false;
			}
		}
	}

	// Клик по черному фону
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

	timeValid() {
		return this.select_H != undefined && this.select_M != undefined;
	}

}
