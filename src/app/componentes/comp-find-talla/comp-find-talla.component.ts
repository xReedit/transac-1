import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TallaModel } from 'src/app/models/talla.model';
import { CrudHttpService } from 'src/app/shared/crud-http.service';

@Component({
  selector: 'app-comp-find-talla',
  templateUrl: './comp-find-talla.component.html',
  styleUrls: ['./comp-find-talla.component.css']
})
export class CompFindTallaComponent implements OnInit {

  @Input()
  myControl = new FormControl();

  @Input()
  _formControlName: FormControl;
  
  @Output()
  getObject: EventEmitter<any> = new EventEmitter();  

  public List: TallaModel[] = [];
  
  constructor(private crudService: CrudHttpService) { 
    if (this._formControlName == undefined) {
      this._formControlName = this.myControl;
    }
    
    this.loadMaestro();
  }

  ngOnInit() {
  }

  private loadMaestro() {
    this.crudService.getAll('api/talla','getall', false, false).subscribe(
      (res: any) => {
        this.List = <TallaModel[]>res.data;
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

  compare(c1: TallaModel, c2: TallaModel): boolean {
    return c1 && c2 ? c1.idtalla === c2.idtalla : c1 === c2;
  }

}
