import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SedeModel } from 'src/app/models/sede.model';
import { CrudHttpService } from 'src/app/shared/crud-http.service';

@Component({
  selector: 'app-comp-find-sede',
  templateUrl: './comp-find-sede.component.html',
  styleUrls: ['./comp-find-sede.component.css']
})
export class CompFindSedeComponent implements OnInit {

  @Input()
  myControl = new FormControl();

  @Input()
  _formControlName: FormControl;
  
  @Output()
  getObject: EventEmitter<any> = new EventEmitter();  

  public List: SedeModel[] = [];
  
  constructor(private crudService: CrudHttpService) { 
    if (this._formControlName == undefined) {
      this._formControlName = this.myControl;
    }
    
    this.loadMaestro();
  }

  ngOnInit() {
  }

  private loadMaestro() {
    this.crudService.getAll('api/sede','getall', true, false).subscribe(
      (res: any) => {
        this.List = <SedeModel[]>res.data;
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

  compareSede(c1: SedeModel, c2: SedeModel): boolean {
    return c1 && c2 ? c1.idsede === c2.idsede : c1 === c2;
  }

}
