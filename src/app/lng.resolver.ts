import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot } from '@angular/router'

@Injectable()
export class LngResolver implements Resolve<any> {

	LNG = {
		en: 'english',
		ru: 'russian',
		he: 'hebrew',
	}

	constructor() { }

	resolve(_AR: ActivatedRouteSnapshot) {
		let lng = _AR.params.lng

		if (this.LNG[lng])
			return lng
		else
			return 'en'
	}

}