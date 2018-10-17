import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core'

import { RequestService } from '../../services/request.service'

import { LNG_PACK } from '../../models/LOCALIZATION'
// import { FURNITURE_LIST } from '../../models/FURNITURE_LIST'

@Component({
	selector: 'item-editor',
	templateUrl: './item-editor.component.html',
	styleUrls: ['./item-editor.component.sass']
})
export class ItemEditorComponent implements OnInit {

	@Input() lng
	LNG = LNG_PACK

	show_modal: boolean = false
	tag: any = {}

	@Output() outItemEdited = new EventEmitter()

	// FUR = FURNITURE_LIST
	@Input() FUR



	@ViewChild('inputNew_price') inputNew_price: ElementRef
	@ViewChild('inputNew_dap') inputNew_dap: ElementRef
	newpriceeditflag = false
	flag_newprice = false

	@Output() outNewPriceSaved = new EventEmitter()

	@Input() admin

	constructor(
		private _request: RequestService
	) { }

	ngOnInit() { }

	showModal(flag) {
		this.show_modal = flag

		if (!flag) {
			this.newpriceeditflag = false
			this.onItemEdited()
		}
	}

	editItem(tag) {
		this.tag = tag
		this.showModal(true)
		// console.log(tag)
	}

	countChange(count) {
		if (count === 'm') if (this.tag.count > 1)
			this.tag.count--
		if (count === 'p')
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
		let DA = this.tag.da
		if (DA !== undefined) this.tag.da = DA ? 0 : 1
	}

	onItemEdited() {
		this.outItemEdited.emit(this.tag)
	}


	// -------------------------------------------------------------------------------- // MISC

	optionType() {
		let T = this.tag
		if (T.PID == 106 && (T.IID >= 1 && T.IID <= 4) || (T.PID == 110 && T.IID == 8)) return 'uw'    // TV unmount
		if (T.PID == 115 && T.IID == 5) return 'uc'    // Chandelier ceiling

		return 'da'
	}

	getItemInfo(F) {
		let PID = this.tag.PID // % 100
			, IID = +this.tag.IID
			, LNG = this.FUR[100].lng // this.FUR[0].lng

		if (F === 'name') return this.FUR[PID].types[IID].name[LNG[this.lng]]
		if (F === 'price') return this.FUR[PID].types[IID].price
		if (F === 'dap') return this.FUR[PID].types[IID].dap
	}

	saveNewItemPrice(F) {
		let newprice
		if (F === 'price') newprice = +this.inputNew_price.nativeElement.value
		if (F === 'dap') newprice = +this.inputNew_dap.nativeElement.value

		let body = {
			PID: +this.tag.arr_PID, // this.tag.PID % 100,
			IID: +this.tag.arr_IID, // +this.tag.IID,
			newprice: newprice,
			type: F
		}

		this._request.saveNewItemPrice(body)
			.subscribe((res: any) => {
				if (res.success) {
					this.newPriceSavedDecoration()
					this.outNewPriceSaved.emit(body)
				}
				else alert('ERROR::')
			})
	}

	newPriceSavedDecoration() {
		this.flag_newprice = true
		setTimeout(() => this.flag_newprice = false, 1000)
	}

}

// xxx() {
// 	const a = this.FUR[this.tag.PID % 100].types[+this.tag.IID].name[this.lng]
// 	console.log(a)
// }