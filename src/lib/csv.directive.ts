import { Directive, HostBinding, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { buildURI, HeaderObj } from './util';

@Directive({ selector: 'a[csvLink]' })
export class CsvDirective implements OnChanges {
  /** the body of the csv */
  @Input() data: string | string[][] | { [key: string]: string }[] | any[] = [];
  /** Set the first line of the csv */
  @Input() headers?: string[] | HeaderObj[];
  /** Set the seperator between values */
  @Input() delimiter = ',';
  /** Set the filename of the csv. Default is `data.csv` */
  @Input()
  set filename(a: string) {
    this.download = a;
  }
  /** adds a Byte order mark to setup the csv as UTF-8  */
  @Input() uFEFF = true;
  @HostBinding() href?: SafeResourceUrl;
  /** filename */
  @HostBinding() download = 'data.csv';
  @Input() @HostBinding() target = '_blank';
  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges() {
    this.href = this.sanitizer.bypassSecurityTrustResourceUrl(
      buildURI(this.data, this.uFEFF, this.headers, this.delimiter),
    );
  }
}
