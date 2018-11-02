import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CrudHttpService } from '../../shared/crud-http.service';
import { CategoriaModel } from '../../models/categoria.model';

@Component({
  selector: 'app-comp-find-categoria',
  templateUrl: './comp-find-categoria.component.html',
  styleUrls: ['./comp-find-categoria.component.css']  
})
export class CompFindCategoriaComponent implements OnInit {

  @Input()
  myControl = new FormControl();

  @Input()
  _formControlName: FormControl;

  @Input()
  getOnlyId: boolean = false; //devuelve solo id, ya no el modelo
  
  @Output()
  getObject: EventEmitter<any> = new EventEmitter();  

  public List: CategoriaModel[] = [];
  
  constructor(private crudService: CrudHttpService) { 
    if (this._formControlName == undefined) {
      this._formControlName = this.myControl;
    }
    
    this.loadMaestro();
  }

  ngOnInit() {
  }

  private loadMaestro() {
    this.crudService.getAll('api/categoria','getall', true, true).subscribe(
      (res: any) => {
        this.List = <CategoriaModel[]>res.data;
        console.log(res)

        // si solo hay un item toma como predeterminado
        if( this.List.length === 1 ) {
          const item0 = this.List[0];                              
          this._emit(item0);          
        }
      }
    )
  }

  _onSelectionChange(a) {    
    this._emit(a.value);
  }

  private _emit(marca: CategoriaModel): void{
    const rptEmit = this.getOnlyId ? marca.idcategoria : marca 
    this._formControlName.setValue(rptEmit);
    this.getObject.emit(rptEmit);
  }

  compareCategoria(c1: CategoriaModel, c2: any): boolean {
    const valCompare = c2 ? c2.idcategoria || c2 : c2;
    return c1 && c2 ? c1.idcategoria === valCompare : c1 === c2;
  }

}
