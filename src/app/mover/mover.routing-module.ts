import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { MoverViewComponent } from "./mover-view/mover-view.component"

const routes: Routes = [
	{
		path: '', children: [
			{ path: '', component: MoverViewComponent },
			{ path: '**', redirectTo: '' }
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MoverRoutingModule { }