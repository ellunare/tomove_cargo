import {
	Component,
	Output,
	EventEmitter,
	Input
} from '@angular/core'

import { LNG_PACK } from '../../models/LOCALIZATION'

@Component({
	selector: 'item-picker',
	templateUrl: './item-picker.component.html',
	styleUrls: ['./item-picker.component.sass']
})
export class ItemPickerComponent {

	@Input() lng = undefined
	LNG = LNG_PACK

	// FURNITURE = FURNITURE_LIST
	@Input() FUR = undefined

	groupID: number

	PID: number
	show_list = {
		P: false,
		I: false
	}

	@Output() outItemSelected = new EventEmitter()

	constructor() { }

	select() {
		this.showList('P', true)
	}

	showList(T, flag) {
		this.show_list[T] = flag
	}

	selectType(e) {
		if (e.target.parentElement.classList.contains('type')) {

			this.groupID = +e.target.parentElement.dataset.gid
			this.PID = +e.target.parentElement.dataset.pid

			this.showList('I', true)
		}
	}

	onItemSelected(e) {
		if (e.target.parentElement.classList.contains('item')) {

			let ID = +e.target.parentElement.dataset.id
				, item = this.FUR[this.groupID].types[ID]
				// , item = this.FUR[this.PID % 100].types[ID]
				, IID = +e.target.parentElement.dataset.iid

			let data: any = {
				PID: this.PID,  // PID
				IID: IID,  // item.id  // IID

				arr_PID: this.groupID,
				arr_IID: ID
			}

			if (item.dap) data.da = 0
			if (item.dad) data.da = 1

			this.outItemSelected.emit(data)
			this.showList('P', false)
			this.showList('I', false)
		}
	}

	// imgStyle(id) {
	// 	// return {
	// 	// 	'background': 'url(assets/f/101/xx.png)',
	// 	// 	'background-position-x': '-' + ((id - 1) * 12.5) + '%'
	// 	// }
	// 	return (id) * 11.11 + '%'
	// }

}
