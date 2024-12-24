import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appFocusOnLoad]'
})
export class FocusOnLoadDirective {

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const input = this.el.nativeElement.querySelector('input')
    input.focus()
  }

}
