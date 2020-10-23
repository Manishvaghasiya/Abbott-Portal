import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { PortalComponent } from './components/portal.component';
import { PortalRoutingModule } from './portal-routing.module';

@NgModule({
  declarations: [
    PortalComponent
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    SharedModule
  ]
})
export class PortalModule { }
