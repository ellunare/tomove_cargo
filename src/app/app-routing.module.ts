import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

const routes: Routes = [
	{ path: '', redirectTo: 'en/request', pathMatch: 'full' },
	{
		path: ':lng', children: [
			{ path: '', loadChildren: './system/system.module#SystemModule' }
			// { path: 'auth', loadChildren: () => AuthModule },
		]
	},
	{ path: '**', redirectTo: 'en/request' },
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }