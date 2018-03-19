import { NgModule } from '@angular/core';

import { CsvDirective } from './csv.directive';

@NgModule({
  declarations: [CsvDirective],
  exports: [CsvDirective],
})
export class CsvModule {}
