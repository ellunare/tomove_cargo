import { Injectable } from '@angular/core'
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
// import { take } from 'rxjs/operators/take'

import { RequestService } from './request.service'

// import { fakeR } from '../models/REQUEST'

@Injectable()
export class REQResolver implements Resolve<any | false> {

	// RRR = fakeR

	constructor(
		private _request: RequestService,
		private _router: Router
	) { }

	resolve(route: ActivatedRouteSnapshot): Observable<any | false> {
		let id = route.params.id
			, lng = 'en'
			, qp = {}

		if (localStorage.getItem('_xad')) qp = { mode: 'full' }

		let code = localStorage.getItem(id)
		if (code) qp = { code: code }

		return this._request.getRequestByID(id, qp)
			.pipe(map((request: any) => {
				if (request.data) return request.data

				else {
					this._router.navigate(['/' + lng, 'db'])
					return false
				}
			}))

		// return new Observable((o) => {
		// 	console.log(o)
		// 	o.next(this.RRR)
		// 	o.complete()
		// })
	}

}
