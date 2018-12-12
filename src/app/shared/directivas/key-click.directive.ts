// asigna o dispara el evento click de cualquier elemento al presionar una tecla
// ejemplo <control [appKeyClick]="F10" ></control // esto dispara click del control cuando presiona la tecla F10

import { Directive, Input, HostListener, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[appKeyClick]'
})
export class KeyClickDirective {
  el: ElementRef;
  @Input ('appKeyClick') appKeyClick: string;

  @Input() onReturn: string;
    constructor(private _el: ElementRef, private renderer: Renderer) {
        this.el = this._el;
    }

    @HostListener('document:keydown', ['$event']) onKeyDown(e: any) {
      if (e.code === this.appKeyClick ) {
        const event = new MouseEvent('click', {bubbles: true});
        this.renderer.invokeElementMethod(this.el.nativeElement, 'dispatchEvent', [event]);
      }
    }

}
