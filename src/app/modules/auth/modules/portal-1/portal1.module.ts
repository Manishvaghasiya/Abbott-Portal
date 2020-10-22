import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { Portal1Component } from './components';
import { Portal1RoutingModule } from './portal1-routing.module';

@NgModule({
  declarations: [
    Portal1Component
  ],
  imports: [
    CommonModule,
    Portal1RoutingModule,
    SharedModule
  ]
})
export class Portal1Module { }
