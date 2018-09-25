import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'

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

	select = {
		H: undefined,
		M: undefined
	}

	show = {
		time: false,
		H: false,
		M: false
	}

	first_run = {
		H: false,
		M: false
	}

	variant = undefined

	constructor() { }

	ngOnInit() {
		this.initTime()
	}

	initTime() {    // Создаем диапазон выбора часов и минут
		let H_start = 0
			, H_end = 23
			, M_start = 0
			, M_end = 60
			, M_step = 10

		for (let i = H_start; i <= H_end; i++) this.hours.push(`${i > 9 ? i : '0' + i}`)
		for (let i = M_start; i < M_end; i += M_step) this.minutes.push(`${i > 9 ? i : '0' + i}`)
	}


	getTimeValue(T) {    // Вывод в ячейку parent
		if (this.select[T] != undefined) return this.select[T]

		let X = this.LNG[this.lng].date['nt' + T.toLowerCase()]
		return X
	}

	cellClick(e, T) {    // Клик по ячейке
		const num = e.target.innerText

		this.select[T] = num
		setTimeout(() => {
			this.showElement(T)
			this.closeAfterSelect()
		}, 200)
	}

	closeAfterSelect() {    // Закрываем автоматически после выбора
		if (this.timeValid())    // если выбраны и часы и минуты
			if (!this.first_run.H && !this.first_run.M)    // и если изменены оба поля
				this.showWIDGET(null)
	}

	showWIDGET(X) {
		if (X !== null) {
			this.variant = X.flag
			this.select.H = X.data.h
			this.select.M = X.data.m
		}

		this.show.time = !this.show.time
		// Открываем после закрытия
		if (this.show.time) {
			this.first_run.H = true
			this.first_run.M = true
		}
		// При закрытии
		else if (this.timeValid()) {    // если выбраны и часы и минуты
			const __send = {
				data: {
					h: this.select.H,
					m: this.select.M
				},
				flag: this.variant
			}
			return this.outOnTimePicked.emit(__send)    // Отдаем НАВЕРХ (strings)
		}
	}

	showElement(T) {    //  Открытие окна выбора часов или минут
		this.show[T] = !this.show[T]

		if (!this.show[T]) this.first_run[T] = false    // Окно открывалось? -> при закрытии меняем флаг
	}

	modalClick(e, cl_name, toclose) {    // Клик по черному фону
		e.stopPropagation()
		if (e.target.classList.contains(cl_name)) {
			if (toclose === 'B') this.showWIDGET(null)
			if (toclose === 'H') this.showElement('H')
			if (toclose === 'M') this.showElement('M')
		}
	}

	timeValid() {
		return this.select.H != undefined && this.select.M != undefined
	}

}
