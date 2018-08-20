import {
	Component,
	Input,
	Output,
	EventEmitter,
} from '@angular/core'

import { LNG_PACK } from '../../models/LOCALIZATION'

@Component({
	selector: 'place-info',
	templateUrl: './place-info.component.html',
	styleUrls: ['./place-info.component.sass']
})
export class PlaceInfoComponent {

	@Input() lng = undefined
	LNG = LNG_PACK

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

	showEdit(flag) {
		if (flag === 'show') {
			this.first_open = false
			this.show_modal = true
		}
		if (flag === 'close') {
			this.onPlaceEdited()
			this.show_modal = false
		}
	}

	disabled(flag) {
		if (flag === 'inputs') if (this.info.t === 'house' || this.info.t === 'store') return true
	}

	required(O) {
		if ((this.info.t === 'apartment' && ((O === 'floor' && !this.info.f) || (O === 'number' && !this.info.n))) || (this.info.t === 'office' && O === 'floor' && !this.info.f)) return true
	}

	onTypeChange() {
		if (this.disabled('inputs')) {
			this.info.e = undefined
			this.info.f = undefined
			this.info.n = undefined
		}
	}

	isEdited() {
		return !this.first_open
	}

	onPlaceEdited() {
		this.outPlaceEdited.emit(this.info)
	}

}