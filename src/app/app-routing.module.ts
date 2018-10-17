import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { LngResolver } from "./lng.resolver"
import { NF404Component } from "./nf404/nf404.component"

const routes: Routes = [
	{ path: '', redirectTo: '/en/request', pathMatch: 'full' },
	{ path: '404', component: NF404Component },
	{
		path: ':lng', resolve: { rootlng: LngResolver }, children: [
			{ path: 'request', loadChildren: './system/system.module#SystemModule' },
			{ path: 'view', loadChildren: './view/view.module#ViewModule' },
			{ path: 'mover', loadChildren: './mover/mover.module#MoverModule' },
			{ path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
			{ path: '**', redirectTo: '/404' },
		]
	},
	{ path: '**', redirectTo: '/404' },
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }