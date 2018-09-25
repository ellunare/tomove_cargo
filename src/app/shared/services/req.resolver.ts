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
		const id = route.params['id']
		// const lng = route.params['lng']
		// console.log(window.location.pathname.substring(1, 3))
		const lng = 'en'

		return this._request.getRequestByID(id)
			.pipe(map((request: any) => {
				// console.log(request)
				if (request.data) {
					return request.data
				}
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
