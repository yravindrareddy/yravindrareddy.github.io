import { HttpErrorInterceptor } from './services/http-error-interceptor.service';
import { GlobalErrorHandler } from './services/global-error-handler.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FindingFalconeComponent } from './finding-falcone/finding-falcone.component';
import { DestinationComponent } from './destination/destination.component';
import { FormsModule } from '@angular/forms';
import { ResultComponent } from './result/result.component';
import { ErrorComponent } from './error/error.component';
import { PlanetComponent } from './planet/planet.component';
import { VehicleComponent } from './vehicle/vehicle.component';

@NgModule({
  declarations: [
    AppComponent,
    FindingFalconeComponent,
    DestinationComponent,
    ResultComponent,
    ErrorComponent,
    PlanetComponent,
    VehicleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
