import { Component, NgModule } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { CsvModule } from './csv.module';

@Component({
  selector: 'test-component',
  template: `
  <a csvLink [data]="data"></a>
  `,
})
export class TestComponent {
  data = [
    { firstname: 'Ahmed', lastname: 'Tomi', email: 'ah@smthing.co.com' },
    { firstname: 'Raed', lastname: 'Labes', email: 'rl@smthing.co.com' },
    { firstname: 'Yezzi', lastname: 'Min l3b', email: 'ymin@cocococo.com' },
  ];
}

@NgModule({
  imports: [CsvModule],
  declarations: [TestComponent],
})
export class NameModule {}

describe('CsvDirective', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NameModule],
    }).compileComponents();
  }));
  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(TestComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should set href', waitForAsync(() => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const link = compiled.querySelector('a') as HTMLElement;
    expect(link.getAttribute('href')).toContain('blob:');
  }));
});
