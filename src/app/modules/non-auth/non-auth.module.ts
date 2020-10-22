import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { NonAuthRoutingModule } from './non-auth-routing.module';
import { NonAuthLayoutComponent } from './non-auth-layout.component';

@NgModule({
  declarations: [
    NonAuthLayoutComponent
  ],
  imports: [
    CommonModule,
    NonAuthRoutingModule,
    HttpClientModule,
    SharedModule
  ]
})
export class NonAuthModule { }
