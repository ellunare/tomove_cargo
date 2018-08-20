import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { SystemComponent } from "./system.component"
import { DashboardComponent } from "./dashboard/dashboard.component"
import { RequestComponent } from "./request/request.component"

import { ViewRequestComponent } from "./view-request/view-request.component"
import { REQResolver } from "../shared/services/req.resolver"
import { TransporterviewComponent } from "./dashboard/transporterview/transporterview.component"

import { AdminoneComponent } from "./dashboard/adminone/adminone.component"
// import { RequestDeactivateGuard } from "./request/request.deactivate-guard"

const routes: Routes = [
	{
		path: '', component: SystemComponent, children: [
			{ path: ':lng/request', component: RequestComponent },
			{
				path: ':lng/db', component: DashboardComponent, children: [
					{ path: ':id', component: ViewRequestComponent, resolve: { request: REQResolver } }
				]
			},
			{ path: ':lng/me', component: TransporterviewComponent },
			{ path: ':lng/admin/mod', component: AdminoneComponent }
		]
	}
]
// , canDeactivate: [RequestDeactivateGuard]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SystemRoutingModule { }