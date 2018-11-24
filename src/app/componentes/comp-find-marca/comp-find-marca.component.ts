import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MarcaModel } from 'src/app/models/marca.model';
import { CrudHttpService } from 'src/app/shared/crud-http.service';

@Component({
  selector: 'app-comp-find-marca',
  templateUrl: './comp-find-marca.component.html',
  styleUrls: ['./comp-find-marca.component.css']
})
export class CompFindMarcaComponent implements OnInit {

  @Input()
  myControl = new FormControl();

  @Input()
  _formControlName: FormControl;

  @Input()
  getOnlyId = false; // devuelve solo id, ya no el modelo

  @Output()
  getObject: EventEmitter<any> = new EventEmitter();

  public List: MarcaModel[] = [];

  constructor(private crudService: CrudHttpService) {
    if (this._formControlName === undefined) {
      this._formControlName = this.myControl;
    }

    this.loadMaestro();
  }

  ngOnInit() {
  }

  private loadMaestro() {
    this.crudService.getAll('api/marca', 'getFilterBy').subscribe(
      (res: any) => {
        this.List = <MarcaModel[]>res.data;
        console.log(res);

        // si solo hay un item toma como predeterminado
        if ( this.List.length === 1 ) {
          const item0 = this.List[0];
          this._emit(item0);
        }
      });
  }

  _onSelectionChange(a) {
    this._emit(a.value);
  }

  private _emit(marca: MarcaModel): void {
    const rptEmit = this.getOnlyId ? marca.idmarca : marca;
    this._formControlName.setValue(rptEmit);
    this.getObject.emit(rptEmit);
  }

  compare(c1: MarcaModel, c2: any): boolean {
    const valCompare = c2 ? c2.idmarca || c2 : c2;
    return c1 && c2 ? c1.idmarca === valCompare : c1 === c2;
  }

}
