import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
	selector: 'adminone',
	templateUrl: './adminone.component.html',
	styleUrls: ['./adminone.component.sass']
})
export class AdminoneComponent implements OnInit {

	success = false

	temp_correct_code = false
	_xad = '0009'

	constructor(
		private _router: Router
	) { }

	ngOnInit() { }

	setAdmin() {
		localStorage.setItem('_xad', '1')
		this.success = true

		setTimeout(() => this._router.navigate(['/en', 'me']), 500)
	}

	checkAccess(e) {
		const V = e.target.value
		this.temp_correct_code = true

		if (V.length == 4) {
			if (V === this._xad) this.setAdmin()
			else this.temp_correct_code = false
		}
	}

}
