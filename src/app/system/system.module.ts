import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SystemRoutingModule } from './system.routing-module'

import { SharedModule } from '../shared/shared.module'
import { SystemComponent } from './system.component'
import { RequestComponent } from './request/request.component'
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewRequestComponent } from './view-request/view-request.component'

// import { RequestDeactivateGuard } from './request/request.deactivate-guard'

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		SystemRoutingModule
	],
	// providers: [
	//   RequestDeactivateGuard
	// ],
	declarations: [
		SystemComponent,
		RequestComponent,
		DashboardComponent,
		ViewRequestComponent,
	]
})
export class SystemModule { }
