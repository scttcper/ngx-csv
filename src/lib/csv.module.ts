import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CsvDirective } from './csv.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CsvDirective],
  exports: [CsvDirective],
})
export class CsvModule {}
