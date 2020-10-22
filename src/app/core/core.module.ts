import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthGuard, SkipLoginGuard } from './guards';
import { ResponseInterceptor } from './interceptors';
import { HttpClientService } from './interceptors/http-client.service';
import { AuthService } from './services';
import { NotFoundComponent, InternalServerErrorComponent, ServerUnavailableComponent } from '../shared/components';

@NgModule({
  declarations: [
    NotFoundComponent,
    InternalServerErrorComponent,
    ServerUnavailableComponent
  ],
  providers: [
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    AuthGuard,
    SkipLoginGuard,
    AuthService,
    HttpClientService
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class CoreModule { }
