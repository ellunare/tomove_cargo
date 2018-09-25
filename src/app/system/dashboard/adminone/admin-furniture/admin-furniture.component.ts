import { Component, OnInit } from '@angular/core'

import { RequestService } from '../../../../shared/services/request.service'

@Component({
	selector: 'admin-furniture',
	templateUrl: './admin-furniture.component.html',
	styleUrls: ['./admin-furniture.component.sass']
})
export class AdminFurnitureComponent implements OnInit {

	FUR // = FURNITURE_LIST
	open_group = []

	coefficient_values = []
	coefficient = 0
	coefficient_saved = false

	constructor(
		private _request: RequestService
	) { }

	ngOnInit() {
		this.getFurniture(null)

		this.initCoefficient()
	}

	getFurniture(flag) {
		this._request.getFurniture(flag)
			.subscribe((res: any) => {
				if (res.success) this.FUR = res.data.furniture

				for (let FG of this.FUR)
					this.open_group.push(false)

				this.coefficient = this.FUR[0].misc.coef
			})
	}


	initCoefficient() {
		let MIN = -30
			, MAX = 30
			, STEP = 5

		for (let i = MIN; i <= MAX; i += STEP)
			this.coefficient_values.push(i)
	}

	renderCoefOption(C) {
		let SIGN = (C !== 0 && C > 0) ? '+ ' : '— '
		return (C === 0 ? ' ' : SIGN) + Math.abs(C) + ' %'
	}


	saveNewCoefficient() {
		let NEW_COEF = +this.coefficient
		this._request.saveNewCoefficient(NEW_COEF)
			.subscribe((res: any) => {
				if (res.success) this.newCoefSaved()
			})
	}

	newCoefSaved() {
		this.coefficient_saved = true
		setTimeout(() => this.coefficient_saved = false, 1000)
	}
}
