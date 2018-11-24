import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CrudHttpService } from 'src/app/shared/crud-http.service';
import { TipoPagoModel } from '../../models/tipopago.model';

@Component({
  selector: 'app-comp-find-tipo-pago',
  templateUrl: './comp-find-tipo-pago.component.html',
  styleUrls: ['./comp-find-tipo-pago.component.css']
})
export class CompFindTipoPagoComponent implements OnInit {

  @Input()
  myControl = new FormControl();

  @Input()
  _formControlName: FormControl;

  @Output()
  getObject: EventEmitter<any> = new EventEmitter();

  public List: TipoPagoModel[] = [];

  constructor(private crudService: CrudHttpService) {
    if (this._formControlName === undefined) {
      this._formControlName = this.myControl;
    }

    this.loadMaestro();
  }

  ngOnInit() {
  }

  private loadMaestro() {
    this.crudService.getAll('api/tipo_pago', 'getall', false, false).subscribe(
      (res: any) => {
        this.List = <TipoPagoModel[]>res.data || [];
        console.log(res);
        // si solo hay un item toma como predeterminado
        if ( this.List.length === 1 ) {
          const item0 = this.List[0];
          this._formControlName.patchValue(item0);
          this.getObject.emit(item0);
        }
      });
  }

  _onSelectionChange(a) {
    this.getObject.emit(a.value);
  }

  compare(c1: TipoPagoModel, c2: TipoPagoModel): boolean {
    return c1 && c2 ? c1.idtipopago === c2.idtipopago : c1 === c2;
  }

}
