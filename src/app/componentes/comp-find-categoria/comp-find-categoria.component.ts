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
      }
    )
  }

  _onSelectionChange(a) {
    this.getObject.emit(a.value);    
  }

  compareCategoria(c1: CategoriaModel, c2: CategoriaModel): boolean {
    return c1 && c2 ? c1.idcategoria === c2.idcategoria : c1 === c2;
  }

}
