import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AuthModule } from './auth/auth.module';
import { AgmCoreModule } from '@agm/core';

import { CONFIG } from '../environments/config';

import { AppComponent } from './app.component';
import { SystemModule } from './system/system.module';

import { MapsGoogleService } from './shared/services/maps-google.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    SystemModule,
    AgmCoreModule.forRoot({
      apiKey: CONFIG.googleMapsKey,
      libraries: ["places"]
    }),
    AppRoutingModule
  ],
  providers: [
    MapsGoogleService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
