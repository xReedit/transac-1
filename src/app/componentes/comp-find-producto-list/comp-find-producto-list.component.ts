import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { startWith } from 'rxjs/internal/operators/startWith';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { map } from 'rxjs/internal/operators/map';

import { CrudHttpService } from 'src/app/shared/crud-http.service';
import { ProductoStockModel } from '../../models/producto.stock.model';
import { InfoTockenService } from 'src/app/shared/services/info-tocken.service';

@Component({
  selector: 'app-comp-find-producto-list',
  templateUrl: './comp-find-producto-list.component.html',
  styleUrls: ['./comp-find-producto-list.component.css']
})
export class CompFindProductoListComponent implements OnInit {

  @Input()
  myControl = new FormControl();

  @Input()
  _formControlName: FormControl;

  @Input()
  idalmacen = 1;

  @Output()
  getObject: EventEmitter<any> = new EventEmitter();

  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger;
  @ViewChild(MatPaginator) paginadorHost: MatPaginator;

  public verFooter = false;

  private pageMostar = 1;
  public rows = 5;
  public totalRecords = 0;
  private ultimoParametroBuscado = '';

  esCodigoBarra = false;
  cargando = false;

  public listPorductoDetalle: ProductoStockModel[] = [];

  constructor(
    private crudService: CrudHttpService,
    private infoTockenService: InfoTockenService) { }

  ngOnInit() {

    this.paginadorHost._intl.nextPageLabel = '';
    this.paginadorHost._intl.previousPageLabel = '';
    this.paginadorHost.hidePageSize = true;

    if (this._formControlName === undefined) {
      this._formControlName = this.myControl;
    }

    // tslint:disable-next-line:no-non-null-assertion
    this._formControlName!.valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        distinctUntilChanged(),
        map(value => value)
      ).subscribe((res: string) => {
        this.ultimoParametroBuscado = res;
        this.pageMostar = 1;
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

    this.cargando = true;

    // this.pageMostar = 1;
    this.rows = 5;
    // this.paginadorHost.pageIndex = 0;


    const _busquedaDescripcion = '`producto_detalle->producto`.`descripcion`,`producto_detalle`.`codigobarra`:contains:' + filterValue;
    // const filtros = JSON.stringify(this.configService.jsonFilter(_filtros));

    // this.crudService.getAll(this.pageMostar, this.rows, 'asc', 'razonsocial', filtros, 'proveedorcliente', 'pagination', null)
    const _filtros = `idalmacen:eq:${this.idalmacen}~y~almacen.idorg:eq:${this.infoTockenService.getInfoSedeToken()}~y~almacen.idsede:eq:${this.infoTockenService.getInfoSedeToken()}~y~stock:gt:0~y~${_busquedaDescripcion}`;
    this.crudService.paginacion('model/producto_stock', 'getpagination', this.pageMostar, this.rows, _filtros, '', '', false, false)
      .subscribe((res: any) => {
        console.log(res);

        this.listPorductoDetalle = <ProductoStockModel[]>res.data || null;
        this.totalRecords = res.pages.totalCount;

        this.verFooter = this.totalRecords > 4 ? true : false;

        // si es codigo de barra y si hay solo un registro
        // no muestra la lista, retorna el unico producto
        if (this.esCodigoBarra) {
          if (this.listPorductoDetalle.length === 1) {
            this.autocomplete.closePanel();
            this._formControlName.setValue(this.listPorductoDetalle[0]);
          } else {
            // envia error producto no se encontro
            this._formControlName.setErrors({ 'incorrect': true, 'msj': 'No se encontro ningun registro.' });
          }

          this._onSelectionChange(null, this.listPorductoDetalle[0] || null);
        }

        this.esCodigoBarra = false;

        this.cargando = false;
      });



  }

  public checkCodigoBarra(): void {
    this.esCodigoBarra = true;
  }

  public _focus(e) {
    e.target.select();
    if (this.listPorductoDetalle) {
      this.autocomplete.closePanel();
    }
  }

  public _displayWith(val: ProductoStockModel): string {
    return val ? val.producto_detalle.producto.descripcion : '';
  }


  public _onSelectionChange(event, productoStockSel: ProductoStockModel): void {
    this.getObject.emit(productoStockSel);
    this.listPorductoDetalle = null;
    this.esCodigoBarra = false;
  }

  public page(event: PageEvent): void {
    this.rows = event.pageSize;
    this.pageMostar = event.pageIndex + 1;
    this.filtrar(this.ultimoParametroBuscado);
  }

}
