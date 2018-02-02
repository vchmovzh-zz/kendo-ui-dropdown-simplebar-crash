import {Directive, ElementRef, AfterViewInit, Output, EventEmitter} from '@angular/core';

export function getSimpleBarInstance() {
  return window['SimpleBar'];
}

@Directive({
  selector: '[appSimpleBar]'
})
  export class SimpleBarDirective implements AfterViewInit {

  private SimpleBar = getSimpleBarInstance();
  private _simpleBar: any;

  @Output() scrollReachedBottom: EventEmitter<any> = new EventEmitter<any>();

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    const self = this;

    this._simpleBar = new this.SimpleBar(this.elementRef.nativeElement, {
      autoHide: true
    });

    this.elementRef.nativeElement.SimpleBar.getScrollElement().addEventListener('scroll', (event) => {
      const target = event.target;

      if ((target.clientHeight + target.scrollTop) >= target.scrollHeight) {
        self.scrollReachedBottom.emit();
      }
    });
  }
}
