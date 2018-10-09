import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../shared/shared.module'

import { AdminRoutingModule } from './admin.routing-module'

import { AdminoneComponent } from './adminone/adminone.component'
import { AdminFurnitureComponent } from './admin-furniture/admin-furniture.component'

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		AdminRoutingModule
	],
	declarations: [
		AdminoneComponent,
		AdminFurnitureComponent,
	]
})
export class AdminModule { }
