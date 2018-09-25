import { Component, Input, Output, EventEmitter } from '@angular/core'

import { LNG_PACK } from '../../models/LOCALIZATION'

@Component({
	selector: 'place-info',
	templateUrl: './place-info.component.html',
	styleUrls: ['./place-info.component.sass']
})
export class PlaceInfoComponent {

	@Input() lng = undefined
	LNG = LNG_PACK

	@Input() ADDRESS_TYPE: string = undefined

	_render = {
		types: [
			{ t: 'apartment' },
			{ t: 'office' },
			{ t: 'house' },
			{ t: 'store' }
		],
		params: [
			{ t: 'entrance' },
			{ t: 'floor' },
			{ t: 'number' }
		]
	}

	first_open = true
	show_modal: boolean = false

	info: any = {
		e: undefined,
		f: undefined,
		n: undefined,
		t: 'apartment'
	}

	@Output() outPlaceEdited = new EventEmitter()

	constructor() { }

	showEdit(F) {
		if (F) this.show_modal = true

		else setTimeout(() => {
			this.first_open = false
			this.show_modal = false
			this.onPlaceEdited()
		}, 1)
	}

	disabled(F, o) {
		let I = this.info
			, T = o.t

		if (F === 'INPUT') if (
			I.t === 'house' && (T === 'entrance' || T === 'number') ||
			I.t === 'store'
		) return true
	}

	required(T) {
		let I = this.info
		if (
			(I.t === 'apartment' && ((T === 'floor' && !I.f) || (T === 'number' && !I.n))) ||
			(I.t === 'office' && T === 'floor' && !I.f) ||
			(I.t === 'house' && T === 'floor' && !I.f)
		) return true
	}

	onTypeChange() {
		this.info.e = undefined
		this.info.f = undefined
		this.info.n = undefined
	}

	isEdited() {
		return !this.first_open
	}

	onPlaceEdited() {
		let I = this.info
		for (let T in I)
			if (!I[T]) I[T] = undefined
		// else if (T === 'f' || T === 'n') I[T] = +I[T]

		this.outPlaceEdited.emit(I)
	}

}