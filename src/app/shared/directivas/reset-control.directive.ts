import { Directive, Input, ElementRef, OnChanges } from '@angular/core';

// directiva que resetea los controles del formulario si cambia appResetControl a true
// entonces resetea solo los controles que tengan este selector
@Directive({
  selector: '[appResetControl]'
})
export class ResetcontrolDirective implements OnChanges {
  el: ElementRef;
  @Input('appResetControl') appResetControl: boolean;
  @Input() valorInicial: String = '';
  @Input() darFocus = false;

  constructor(private _el: ElementRef) {
    this.el = this._el;
  }

  ngOnChanges(): void {
    if (!this.appResetControl) { return; }

    switch (this.el.nativeElement.nodeName) {
      case 'INPUT': this.el.nativeElement.value = this.valorInicial; break;
      case 'SELECT': this.el.nativeElement.selectedIndex = this.valorInicial; break;
      default: return;
    }

    if (this.darFocus) { this.el.nativeElement.focus(); }
  }
}