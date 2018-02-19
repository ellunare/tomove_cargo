import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SystemComponent } from "./system.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RequestComponent } from "./request/request.component";

const routes: Routes = [
	{
		path: 'system', component: SystemComponent, children: [
			{ path: 'dashboard', component: DashboardComponent },
			{ path: 'request', component: RequestComponent }
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SystemRoutingModule { }