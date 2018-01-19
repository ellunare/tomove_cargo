import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CONFIG } from '../environments/config';

import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { S1WrapComponent } from './components/s1/s1-wrap/s1-wrap.component';
import { S1MapComponent } from './components/s1/s1-map/s1-map.component';

import { MapsGoogleService } from './-services/maps-google.service';

@NgModule({
  declarations: [
    AppComponent,
    S1WrapComponent,
    S1MapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // FormsModule,
    // ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: CONFIG.googleMapsKey,
      libraries: ["places"]
    })
  ],
  providers: [
    MapsGoogleService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
