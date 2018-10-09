import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { RequestComponent } from "./request/request.component"

const routes: Routes = [
	{
		path: '', children: [
			{ path: '', component: RequestComponent },
			{ path: '**', redirectTo: '' }
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SystemRoutingModule { }