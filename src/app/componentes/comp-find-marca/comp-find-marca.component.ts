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
  
  @Output()
  getObject: EventEmitter<any> = new EventEmitter();  

  public List: MarcaModel[] = [];
  
  constructor(private crudService: CrudHttpService) { 
    if (this._formControlName == undefined) {
      this._formControlName = this.myControl;
    }
    
    this.loadMaestro();
  }

  ngOnInit() {
  }

  private loadMaestro() {
    this.crudService.getAll('api/marca','getall').subscribe(
      (res: any) => {
        this.List = <MarcaModel[]>res.data;
        console.log(res)
        
        // si solo hay un item toma como predeterminado
        if( this.List.length === 1 ) {
          const item0 = this.List[0];          
          this._formControlName.patchValue(item0);          
          this.getObject.emit(item0);    
        }        
      }
    )
  }

  _onSelectionChange(a) {    
    this.getObject.emit(a.value);    
  }

  compare(c1: MarcaModel, c2: MarcaModel): boolean {
    return c1 && c2 ? c1.idmarca === c2.idmarca : c1 === c2;
  }

}
