import { Injectable } from '@angular/core'
import { CanDeactivate } from '@angular/router'
import { RequestComponent } from './request.component'

@Injectable()
export class RequestDeactivateGuard implements CanDeactivate<RequestComponent> {

	canDeactivate(__component: RequestComponent): boolean {
		const text = "You have unsaved changes! If you leave, your changes will be lost."

		// return __component.canDeactivate ? true : confirm(text)
		return true // ????
	}

}
