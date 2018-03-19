import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MdoButtonModule } from '@ctrl/ngx-github-buttons';

import { CsvModule } from '../lib/csv.module';
import { AppComponent } from './app.component';
import { DownloadSvgComponent } from './download-svg/download-svg.component';

@NgModule({
  declarations: [AppComponent, DownloadSvgComponent],
  imports: [BrowserModule, MdoButtonModule, CsvModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
