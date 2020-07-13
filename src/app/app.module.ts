import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GhButtonModule } from '@ctrl/ngx-github-buttons';

import { CsvModule } from '../lib/csv.module';
import { AppComponent } from './app.component';
import { DownloadSvgComponent } from './download-svg/download-svg.component';

@NgModule({
  declarations: [AppComponent, DownloadSvgComponent],
  imports: [BrowserModule, GhButtonModule, CsvModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
