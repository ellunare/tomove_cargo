import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { take } from 'rxjs/operators/take';

import { RequestService } from './request.service';

@Injectable()
export class REQResolver implements Resolve<any | false> {

	constructor(
		private _request: RequestService,
		private _router: Router
	) { }

	resolve(route: ActivatedRouteSnapshot): Observable<any | false> {
		const id = route.params['id']
		// const lng = route.params['lng']
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
	}

}
