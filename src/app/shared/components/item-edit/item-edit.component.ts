import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'

import { LNG_PACK } from '../../models/LOCALIZATION'
import { FURNITURE_LIST } from '../../models/FURNITURE_LIST'

@Component({
	selector: 'item-edit',
	templateUrl: './item-edit.component.html',
	styleUrls: ['./item-edit.component.sass']
})
export class ItemEditComponent implements OnInit {

	@Input() lng
	LNG = LNG_PACK

	show_modal: boolean = false
	tag: any = {}

	@Output() outItemEdited = new EventEmitter()

	FUR = FURNITURE_LIST

	constructor() { }

	ngOnInit() { }

	showModal(flag) {
		this.show_modal = flag

		if (!flag) this.onItemEdited()
	}

	editItem(tag) {
		this.tag = tag
		this.showModal(true)
	}

	countChange(dir) {
		if (dir === 'm') if (this.tag.count > 1)
			this.tag.count--
		if (dir === 'p')
			this.tag.count++
	}

	trashItem() {
		this.tag.trash = !this.tag.trash
	}

	deleteItem() {
		this.tag.delete = true
		this.showModal(false)
	}

	daChange() {
		const DA = this.tag.da
		if (DA[1] * 1) {
			const idx = 0
			const SYMBOL = DA[0]
			const REP = +SYMBOL ? 0 : 1

			this.tag.da = DA.substring(0, idx) + REP + DA.substring(idx + 1)
		}
	}

	onItemEdited() {
		this.outItemEdited.emit(this.tag)
	}

}

// xxx() {
// 	const a = this.FUR[this.tag.PID % 100].types[+this.tag.IID].name[this.lng]
// 	console.log(a)
// }