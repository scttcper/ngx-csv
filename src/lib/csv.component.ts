import { Directive, OnInit, Input, HostBinding } from '@angular/core';


@Directive({ selector: ':not(a)[csvLink]' })
export class CsvDirective implements OnInit {
  @Input() data: string[][] | any[][];
  @Input() headers: string[];
  @Input() target: string;
  @Input() delimiter = ',';
  @Input() filename = 'download.csv';
  @Input() uFEFF = true;
  @HostBinding() href: string;
  constructor() {
    // buildURI(this.data, this.uFEFF, this.headers, this.delimiter);
  }

  ngOnInit() {}
}
