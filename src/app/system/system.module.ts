import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemRoutingModule } from './system-routing.module';

import { SharedModule } from '../shared/shared.module';
import { SystemComponent } from './system.component';
import { RequestComponent } from './request/request.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule
  ],
  declarations: [
    SystemComponent,
    RequestComponent,
    DashboardComponent
  ]
})
export class SystemModule { }
