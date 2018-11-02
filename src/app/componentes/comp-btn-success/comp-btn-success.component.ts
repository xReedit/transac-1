import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comp-btn-success',
  templateUrl: './comp-btn-success.component.html',
  styleUrls: ['./comp-btn-success.component.css']
})
export class CompBtnSuccessComponent implements OnInit {
  // public procesando: boolean = false;
  public classorgin = 'xbtn btn-success';

  @Input()
  _procesando: boolean = false;

  @Input()
  _text: string = '| Guardar';

  @Input()
  _textKey: string = 'F10';

  @Input()
  _icon: string = 'fas fa-check';

  @Input()
  disabled: boolean = false;

  @Input()
  _class: string = '';

  constructor() { }

  ngOnInit() {
  }

}
