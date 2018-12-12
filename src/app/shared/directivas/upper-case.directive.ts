import { Directive, HostListener, ElementRef } from '@angular/core';


@Directive({
  selector: '[appUpperCase]'
})

export class UpperCaseDirective {

  constructor(public ref: ElementRef) {
  }

  @HostListener('input', ['$event']) onInput(event) {
    this.ref.nativeElement.value = event.target.value.toUpperCase();
  }

}
