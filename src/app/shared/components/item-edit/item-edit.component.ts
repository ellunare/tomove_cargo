import {
	Component,
	OnInit,
	Output,
	EventEmitter
} from '@angular/core'

@Component({
	selector: 'item-edit',
	templateUrl: './item-edit.component.html',
	styleUrls: ['./item-edit.component.sass']
})
export class ItemEditComponent implements OnInit {

	show_modal: boolean = false
	tag: any = {}

	@Output() outItemEdited = new EventEmitter()

	constructor() { }

	ngOnInit() {
	}

	modalClick(flag) {
		if (flag === 'open') {
			this.show_modal = true
		}
		if (flag === 'close') {
			this.show_modal = false
		}
	}

	editItem(tag) {
		this.tag = tag
		console.log(tag)
		this.modalClick('open')
	}

	countChange(dir) {
		if (dir === 'm') {
			if (this.tag.count > 1) this.tag.count--
		}
		if (dir === 'p') {
			this.tag.count++
		}
		this.onItemEdited()
	}

	trashItem() {
		this.tag.trash = !this.tag.trash
		this.onItemEdited()
	}

	deleteItem() {
		this.tag.delete = true
		this.modalClick('close')
		this.onItemEdited()
	}

	daChange() {
		if (this.tag.da) this.tag.da = this.tag.da === 11 ? 10 : 11
	}

	onItemEdited() {
		this.outItemEdited.emit(this.tag)
	}

}
