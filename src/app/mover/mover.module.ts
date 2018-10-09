import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../shared/shared.module'

import { MoverRoutingModule } from './mover.routing-module'

import { MoverViewComponent } from './mover-view/mover-view.component'

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		MoverRoutingModule
	],
	declarations: [
		MoverViewComponent
	]
})
export class MoverModule { }
