import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayoutComponent } from './auth-layout.component';
import { FullComponent } from './layouts/full/full.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { NavigationComponent } from '../../shared/header-navigation/navigation.component';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../../shared/shared.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

@NgModule({
  declarations: [
    AuthLayoutComponent,
    FullComponent,
    NavigationComponent,
    BreadcrumbComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    PerfectScrollbarModule,
    ChartsModule,
    SharedModule,
    NgIdleKeepaliveModule.forRoot()
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
})
export class AuthModule { }
