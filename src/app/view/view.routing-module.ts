import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { REQResolver } from "../shared/services/req.resolver"

import { ViewRequestComponent } from "./view-request/view-request.component"

const routes: Routes = [
	{
		path: '', children: [
			{ path: ':id', component: ViewRequestComponent, resolve: { request: REQResolver } },
			{ path: '**', redirectTo: '/404' }
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ViewRoutingModule { }