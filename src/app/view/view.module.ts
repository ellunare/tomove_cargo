import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from '../shared/shared.module'
import { ViewRequestComponent } from './view-request/view-request.component'
import { ViewRoutingModule } from './view.routing-module'

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		ViewRoutingModule
	],
	declarations: [
		ViewRequestComponent
	]
})
export class ViewModule { }
