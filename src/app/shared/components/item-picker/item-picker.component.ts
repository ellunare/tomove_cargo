import {
	Component,
	Output,
	EventEmitter
} from '@angular/core'

import { FURNITURE_LIST } from '../../models/FURNITURE_LIST'

@Component({
	selector: 'item-picker',
	templateUrl: './item-picker.component.html',
	styleUrls: ['./item-picker.component.sass']
})
export class ItemPickerComponent {

	FURNITURE = FURNITURE_LIST
	PID: number
	show_list_P: boolean = false
	show_list_I: boolean = false

	@Output() outItemSelected = new EventEmitter()

	constructor() { }

	select() {
		this.showList('P', true)
	}

	showList(T, flag) {
		this['show_list_' + T] = flag
	}

	selectType(e) {
		if (e.target.parentElement.classList.contains('type')) {
			const id = e.target.parentElement.dataset.id
			this.PID = +id
			this.showList('I', true)
		}
	}

	onItemSelected(e) {
		if (e.target.parentElement.classList.contains('item')) {
			const id = e.target.parentElement.dataset.id;

			const data = {
				PID: this.PID, // PID
				item: this.FURNITURE[this.PID % 100].types[+id] // IID
			}

			this.outItemSelected.emit(data)
			this.showList('P', false)
			this.showList('I', false)
		}
	}

}
