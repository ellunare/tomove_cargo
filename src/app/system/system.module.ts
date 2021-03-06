import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../shared/shared.module'

import { SystemRoutingModule } from './system.routing-module'

import { RequestComponent } from './request/request.component'

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		SystemRoutingModule
	],
	declarations: [
		RequestComponent,
	]
})
export class SystemModule { }
