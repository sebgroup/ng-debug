import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { NgDebugService, NgDebugConfig } from '@sebgroup/ng-debug';
import { takeUntil } from 'rxjs/operators';

export const appDebugConfig: NgDebugConfig = {
  name: 'demo app',
  items: [
    {
      id: 'yodaMode',
      name: 'Yoda mode',
      type: 'checkbox',
    },
    {
      id: 'color',
      name: 'Color',
      type: 'text',
    },
  ]
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @HostBinding('style.color') color = 'black';


  exampleObject = {
    awesome: true,
    lib: 'yes',
    debug: 'nottrue',
    type: 'very awesome',
  };

  exampleArray = [
    this.exampleObject,
    this.exampleObject,
    this.exampleObject,
    this.exampleObject,
    this.exampleObject,
    this.exampleObject,
    this.exampleObject,
    this.exampleObject,
    this.exampleObject,
    this.exampleObject,
    this.exampleObject,
    this.exampleObject,
  ];
  yodaMode = false;

  private finalizer = new Subject();

  constructor(
    private debugService: NgDebugService
  ) { }

  ngOnInit(): void {
    this.debugService.getFilteredObservable('color')
      .pipe(takeUntil(this.finalizer))
      .subscribe((v) => {
        this.color = v;
        console.log('color', v);
      });
    this.debugService.getFilteredObservable('yodaMode')
      .pipe(takeUntil(this.finalizer))
      .subscribe(v => {
        this.yodaMode = v;
        console.log('yodaMode', v);
      });

  }

  toggleMenu() {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    window['ngdbg'].apply();
  }

  ngOnDestroy() {
    this.finalizer.next();
  }
}
