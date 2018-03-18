import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CsvModule } from '../lib/csv.module';
import { DownloadSvgComponent } from './download-svg/download-svg.component';


@NgModule({
  declarations: [
    AppComponent,
    DownloadSvgComponent,
  ],
  imports: [
    BrowserModule,
    CsvModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
