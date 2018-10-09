import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'

import { LngResolver } from './lng.resolver'

import { AppComponent } from './app.component'
import { NF404Component } from './nf404/nf404.component'


@NgModule({
	declarations: [
		AppComponent,
		NF404Component
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule
	],
	providers: [
		LngResolver
	],
	bootstrap: [AppComponent]
})

export class AppModule { }
