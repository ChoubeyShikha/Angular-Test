import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import {ApiService} from './api.service';

@NgModule({
  declarations: [
    AppComponent,
    LeftPanelComponent,
    RightPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
providers: [ApiService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
