import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CsvComponent } from './csv.component';

@NgModule({
  imports: [CommonModule],
  exports: [CsvComponent],
  declarations: [CsvComponent],
})
export class CsvModule {}
