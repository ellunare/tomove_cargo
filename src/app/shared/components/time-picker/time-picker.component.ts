import {
	Component,
	OnInit,
	Output,
	EventEmitter,
	Input
} from '@angular/core'

import { LNG_PACK } from '../../models/LOCALIZATION'

@Component({
	selector: 'time-picker',
	templateUrl: './time-picker.component.html',
	styleUrls: ['./time-picker.component.sass']
})
export class TimePickerComponent implements OnInit {

	@Input() lng = undefined
	LNG = LNG_PACK

	hours = []
	minutes = []

	@Output() outOnTimePicked = new EventEmitter()

	select_H = undefined
	select_M = undefined

	show_time = false
	show_H = false
	show_M = false

	first_run_H = false
	first_run_M = false

	variant = undefined

	constructor() { }

	ngOnInit() {
		this.initTime()
	}

	// Создаем диапазон выбора часов и минут
	initTime() {
		const
			h_start = 0,
			h_end = 23,

			m_start = 0,
			m_end = 60,
			m_step = 10

		for (let i = h_start; i <= h_end; i++) this.hours.push(`${i > 9 ? i : '0' + i}`)
		for (let i = m_start; i < m_end; i += m_step) this.minutes.push(`${i > 9 ? i : '0' + i}`)
	}


	// Вывод в ячейку parent
	getTimeValue(T) {
		if (this['select_' + T] != undefined) {
			return this['select_' + T]
		}
		return T + T
	}

	// Клик по ячейке
	cellClick(e, T) {
		const num = e.target.innerText

		this['select_' + T] = num
		setTimeout(() => {
			this.showElement(T)
			this.closeAfterSelect()
		}, 200)
	}

	// Закрываем автоматически после выбора
	closeAfterSelect() {
		// если выбраны и часы и минуты
		if (this.timeValid()) {
			// и если изменены оба поля
			if (!this.first_run_H && !this.first_run_M) {
				this.showWIDGET(null)
			}
		}
	}

	showWIDGET(X) {
		if (X !== null) {
			this.variant = X.flag
			this.select_H = X.data.h
			this.select_M = X.data.m
		}

		this.show_time = !this.show_time
		// Открываем после закрытия
		if (this.show_time) {
			this.first_run_H = true
			this.first_run_M = true
		}
		// При закрытии
		else {
			// если выбраны и часы и минуты
			if (this.timeValid()) {
				// Отдаем НАВЕРХ (strings)
				const __send = {
					data: {
						h: this.select_H,
						m: this.select_M
					},
					flag: this.variant
				}
				this.outOnTimePicked.emit(__send)
				return
			}
		}
	}

	//  Открытие окна выбора часов или минут
	showElement(T) {
		this['show_' + T] = !this['show_' + T]
		// Окно открывалось? -> при закрытии меняем флаг
		if (!this['show_' + T]) this['first_run_' + T] = false
	}

	// Клик по черному фону
	modalClick(e, cl_name, toclose) {
		e.stopPropagation();
		if (e.target.classList.contains(cl_name)) {
			if (toclose === 'B') this.showWIDGET(null)
			if (toclose === 'H') this.showElement('H')
			if (toclose === 'M') this.showElement('M')
		}
	}

	timeValid() {
		return this.select_H != undefined && this.select_M != undefined
	}

}
