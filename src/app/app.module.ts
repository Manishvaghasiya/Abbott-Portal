import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ToastsContainer } from './shared/toast-container';
import { NgHttpLoaderModule } from 'ng-http-loader';

@NgModule({
    declarations: [
        AppComponent,
        ToastsContainer
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        NgHttpLoaderModule.forRoot(),
        NgbModule,
        CoreModule,
        RouterModule.forRoot(Approutes)
    ],
    providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }],
    bootstrap: [AppComponent]
})
export class AppModule { }
