import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { ReportComponent } from './components/report.component';
import { ReportRoutingModule } from './report-routing.module';

@NgModule({
  declarations: [
    ReportComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule
  ]
})
export class ReportModule { }
