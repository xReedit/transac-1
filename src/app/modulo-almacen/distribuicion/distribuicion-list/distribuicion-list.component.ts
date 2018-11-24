import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudHttpService } from '../../../shared/crud-http.service';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { UsuarioStorageService } from '../../../shared/services/usuario-storage.service';

@Component({
  selector: 'app-distribuicion-list',
  templateUrl: './distribuicion-list.component.html',
  styleUrls: ['./distribuicion-list.component.css']
})
export class DistribuicionListComponent implements OnInit {

  @ViewChild(MatPaginator) paginadorHost: MatPaginator;

  listDistribuicion: any;
  displayedColumns = ['#', 'Fecha', 'd', 'a', 'Usuario'];
  totalRecords = 0;
  rows = 10;
  pageMostar = 1;

  showLista = true;

  constructor(
    private crudHttpService: CrudHttpService,
    private usuarioService: UsuarioStorageService
  ) { }

  ngOnInit() {
    this.paginadorHost._intl.nextPageLabel = '';
    this.paginadorHost._intl.previousPageLabel = '';
    this.paginadorHost.hidePageSize = true;

    this.loadDatos();
  }

  changeVerLista(): void { this.showLista = !this.showLista; }

  nuevoRegistro(): void {
    this.changeVerLista();
  }

  loadDatos(): void {
    const filtros = `idorg:eq:${this.usuarioService.getUsuario().idorg}~y~idsede:eq:${this.usuarioService.getUsuario().idsede}`;

    this.crudHttpService.paginacion('model/distribuicion', 'getpagination', this.pageMostar, this.rows, filtros,
      'iddistribuicion', 'desc', false, false).subscribe( (res: any) => {
        console.log(res);
        this.listDistribuicion = JSON.parse(JSON.stringify(res.data));
        this.totalRecords = res.pages.totalCount;
      });
  }


  public page(event: PageEvent): void {
    this.rows = event.pageSize;
    this.pageMostar = event.pageIndex + 1;
    this.loadDatos();
  }

}
