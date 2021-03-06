import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlmacenModel } from 'src/app/models/almacen.model';
import { CrudHttpService } from 'src/app/shared/crud-http.service';

@Component({
  selector: 'app-comp-find-almacen',
  templateUrl: './comp-find-almacen.component.html',
  styleUrls: ['./comp-find-almacen.component.css']
})
export class CompFindAlmacenComponent implements OnInit {

  @Input()
  myControl = new FormControl();

  @Input()
  _formControlName: FormControl;

  @Output()
  getObject: EventEmitter<any> = new EventEmitter();

  @Input()
  getOnlyId = false; // devuelve solo id, ya no el modelo

  public List: AlmacenModel[] = [];

  constructor(private crudService: CrudHttpService) {
    if (this._formControlName === undefined) {
      this._formControlName = this.myControl;
    }

    this.loadMaestro();
  }

  ngOnInit() {
  }

  private loadMaestro() {
    this.crudService.getAll('api/almacen', 'getall', false, false).subscribe(
      (res: any) => {
        this.List = <AlmacenModel[]>res.data;
        console.log(res);

        // si solo hay un item toma como predeterminado
        if (this.List.length === 1) {
          const item0 = this.List[0];
          this._emit(item0);
        }
      }
    );
  }

  _onSelectionChange(a) {
    this._emit(a.value);
  }

  compare(c1: AlmacenModel, c2: AlmacenModel): boolean {
    const valCompare = c2 ? c2.idalmacen || c2 : c2;
    return c1 && c2 ? c1.idalmacen === valCompare : c1 === c2;
  }

  _emit(item: AlmacenModel): void {
    const rptEmit = this.getOnlyId ? item.idalmacen : item;
    this._formControlName.setValue(rptEmit);
    this.getObject.emit(rptEmit);
  }

}
