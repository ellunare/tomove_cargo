import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { SystemComponent } from "./system.component"
import { DashboardComponent } from "./dashboard/dashboard.component"
import { RequestComponent } from "./request/request.component"

import { ViewRequestComponent } from "./view-request/view-request.component"
import { REQResolver } from "../shared/services/req.resolver"
import { TransporterviewComponent } from "./dashboard/transporterview/transporterview.component"

import { AdminoneComponent } from "./dashboard/adminone/adminone.component"
import { AdminFurnitureComponent } from "./dashboard/adminone/admin-furniture/admin-furniture.component"
// import { RequestDeactivateGuard } from "./request/request.deactivate-guard"

const routes: Routes = [
	{
		path: '', component: SystemComponent, children: [
			{ path: '', redirectTo: '/en/request', pathMatch: 'full' },
			{ path: 'request', component: RequestComponent },
			{ path: 'me', component: TransporterviewComponent },
			{
				path: 'db', component: DashboardComponent, children: [
					{ path: ':id', component: ViewRequestComponent, resolve: { request: REQResolver } }
				]
			},
			{ path: 'admin/mod', component: AdminoneComponent },
			{ path: 'admin/furniture', component: AdminFurnitureComponent },
		]
	}
]
// , canDeactivate: [RequestDeactivateGuard]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SystemRoutingModule { }