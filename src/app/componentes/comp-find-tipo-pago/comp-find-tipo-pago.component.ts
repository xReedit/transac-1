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

  @Input()
  getOnlyId = false; // devuelve solo id, ya no el modelo

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
          this._emit(item0);
          // this._formControlName.patchValue(item0);
          // this.getObject.emit(item0);
        }
      });
  }

  _onSelectionChange(a) {
    // this.getObject.emit(a.value);
    this._emit(a.value);
  }

  compare(c1: TipoPagoModel, c2: TipoPagoModel): boolean {
    // return c1 && c2 ? c1.idtipopago === c2.idtipopago : c1 === c2;
    const valCompare = c2 ? c2.idtipo_pago || c2 : c2;
    return c1 && c2 ? c1.idtipo_pago === valCompare : c1 === c2;
  }

  _emit(item: TipoPagoModel): void {
    const rptEmit = this.getOnlyId ? item.idtipo_pago : item;
    this._formControlName.setValue(rptEmit);
    this.getObject.emit(rptEmit);
  }

}
