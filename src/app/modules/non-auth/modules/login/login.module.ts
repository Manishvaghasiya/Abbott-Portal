import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule
  ]
})
export class LoginModule { }
