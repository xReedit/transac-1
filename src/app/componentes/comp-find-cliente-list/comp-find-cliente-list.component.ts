import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger, MatPaginator, PageEvent } from '@angular/material';
import { ClienteModel } from 'src/app/models/cliente.model';
import { CrudHttpService } from 'src/app/shared/crud-http.service';

import { startWith } from 'rxjs/internal/operators/startWith';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-comp-find-cliente-list',
  templateUrl: './comp-find-cliente-list.component.html',
  styleUrls: ['./comp-find-cliente-list.component.css']
})
export class CompFindClienteListComponent implements OnInit {

  @Input()
  myControl = new FormControl();

  @Input()
  _formControlName: FormControl;  

  @Output()
  getObject: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;
  @ViewChild(MatPaginator) paginadorHost: MatPaginator;


  public verFooter: boolean = false;

  private pageMostar: number = 1;
  public rows: number = 5;
  public totalRecords: number = 0;
  private ultimoParametroBuscado: string = '';


  public listProveedorCliente: ClienteModel[] = [];
  
  constructor(private crudService: CrudHttpService) { }

  ngOnInit() {
    
    this.paginadorHost._intl.nextPageLabel = '';
    this.paginadorHost._intl.previousPageLabel = '';        
    this.paginadorHost.hidePageSize=true;
    



    if (this._formControlName == undefined) {
      this._formControlName = this.myControl;
    }

    this._formControlName!.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        distinctUntilChanged(),
        map(value => value)
      ).subscribe((res: string) => {
        console.log(res);
        this.pageMostar = 1;
        this.rows = 5;
        this.ultimoParametroBuscado = res;
        this.paginadorHost.pageIndex = 0;
        this.filtrar(res);
      });


  }


  private filtrar(filterValue): void {    
    if (typeof filterValue !== 'string') { 
      return; 
    }

    if (filterValue === '') { 
      this.autocomplete.closePanel(); 
      return; 
    }

    const _filtros = `(nombres-contains-'!${filterValue}!')`;
    // const filtros = JSON.stringify(this.configService.jsonFilter(_filtros));

    // this.crudService.getAll(this.pageMostar, this.rows, 'asc', 'razonsocial', filtros, 'proveedorcliente', 'pagination', null)
    this.crudService.paginacion('api/cliente','getpagination',this.pageMostar,this.rows,_filtros,'nombres','ASC', true, true)
      .subscribe((res: any) => {        
        this.listProveedorCliente = <ClienteModel[]>res.data || null;
        this.totalRecords = res.pages.totalCount;

        this.verFooter = this.totalRecords > 4 ? true : false;
    });    


  
    }



  public _focus(e) {
    e.target.select();
    if (this.listProveedorCliente) {
      this.autocomplete.closePanel();
    }
  }

  public _displayWith(val: ClienteModel): string {
    return val ? val.nombres : '';
  }


  public _onSelectionChange(event, proveedorCliente: ClienteModel): void {        
    this.getObject.emit(proveedorCliente);    
    this.listProveedorCliente = null;
  }

  public page(event: PageEvent): void {
    this.rows = event.pageSize;
    this.pageMostar = event.pageIndex+1;
    this.filtrar(this.ultimoParametroBuscado);
  }

}
