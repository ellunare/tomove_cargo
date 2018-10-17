import { Component, OnInit } from '@angular/core'
// import { Router } from '@angular/router'

@Component({
	selector: 'nf404',
	templateUrl: './nf404.component.html',
	styleUrls: ['./nf404.component.sass']
})
export class NF404Component implements OnInit {

	constructor(
		// private _router: Router
	) { }

	ngOnInit() {
		// this._router.navigate(['/system', 'request'], { queryParams: { page: 1 } })
		return window.location.assign('https://hamovil-sheli.co.il/404')
	}

}
