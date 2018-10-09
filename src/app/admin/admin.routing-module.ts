import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { AdminoneComponent } from "./adminone/adminone.component"
import { AdminFurnitureComponent } from "./admin-furniture/admin-furniture.component"

const routes: Routes = [
	{
		path: '', children: [
			{ path: '', component: AdminoneComponent },
			{ path: 'furniture', component: AdminFurnitureComponent },
			{ path: '**', redirectTo: '' }
		]
	}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }