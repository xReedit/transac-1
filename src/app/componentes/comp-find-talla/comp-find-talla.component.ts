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

  @Input()
  getOnlyId: boolean = false; //devuelve solo id, ya no el modelo
  
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
          this._emit(item0); 
        }        
      }
    )
  }

  _onSelectionChange(a) {    
    this._emit(a.value);   
  }

  compare(c1: TallaModel, c2: any): boolean {    
    const valCompare = c2 ? c2.idtalla || c2 : c2;
    return c1 && c2 ? c1.idtalla === valCompare : c1 === c2;
  }

  _emit(talla: TallaModel): void{
    const rptEmit = this.getOnlyId ? talla.idtalla : talla;
    this._formControlName.setValue(rptEmit);
    this.getObject.emit(rptEmit);
  }  

}
