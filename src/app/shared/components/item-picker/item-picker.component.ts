import {
	Component,
	Output,
	EventEmitter
} from '@angular/core';

import { FURNITURE_LIST } from '../../models/FURNITURE_LIST';

@Component({
	selector: 'item-picker',
	templateUrl: './item-picker.component.html',
	styleUrls: ['./item-picker.component.sass']
})
export class ItemPickerComponent {

	FURNITURE = FURNITURE_LIST;
	f_typeId: number;
	show_f_list: boolean = false;
	show_i_list: boolean = false;

	@Output() outItemSelected = new EventEmitter();

	constructor() { }

	select() {
		this.showList('F', true);
	}

	showList(type, flag) {
		if (type === 'F') {
			this.show_f_list = flag;
		}
		if (type === 'I') {
			this.show_i_list = flag;
		}
	}

	selectType(e) {
		if (e.target.parentElement.classList.contains('type')) {
			const id = e.target.parentElement.dataset.id;
			this.f_typeId = id;
			this.showList('I', true);
		}
	}

	onItemSelected(e) {
		if (e.target.parentElement.classList.contains('item')) {
			const id = e.target.parentElement.dataset.id;

			const data = {
				id_type: this.f_typeId, // PID
				item: this.FURNITURE[+this.f_typeId - 1 - 100].types[+id - 1] // CID
			}

			this.outItemSelected.emit(data);
			this.showList('I', false);
			this.showList('F', false);
		}
	}

}
