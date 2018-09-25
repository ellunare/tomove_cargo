import {
	Component,
	Output,
	EventEmitter,
	Input
} from '@angular/core'

// import { FURNITURE_LIST } from '../../models/FURNITURE_LIST'
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
			const id = e.target.parentElement.dataset.id
			this.PID = +id
			this.showList('I', true)
		}
	}

	onItemSelected(e) {
		if (e.target.parentElement.classList.contains('item')) {
			let ID = +e.target.parentElement.dataset.id
				, item = this.FUR[this.PID % 100].types[ID]

			let data: any = {
				PID: this.PID,  // PID
				IID: item.id  // IID
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
