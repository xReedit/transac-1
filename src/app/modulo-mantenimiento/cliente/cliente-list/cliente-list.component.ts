import { Component, OnInit } from '@angular/core';
import { CrudHttpService } from 'src/app/shared/crud-http.service';
import { UsuarioStorageService } from 'src/app/shared/services/usuario-storage.service';
import { UsuarioModel } from '../../../models/usuario.model';
import { PageEvent } from '@angular/material/paginator';
import { ClienteModel } from '../../../models/cliente.model';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  usuario: UsuarioModel;
  displayedColumns: string[] = ['#', 'nombres', 'telefono', 'linea_credito', 'linea_credito_utilizada', 'accion'];

  // paginacion
  totalRecords = 0;
  rows = 10;
  pageMostar = 1;

  listClientes: ClienteModel[] = [];
  rowIndexCondirmDelete: number = null; // index de la fila a eliminar , para mostrar la barra de confirmarcion

  constructor(private crudHttpService: CrudHttpService, private usuarioService: UsuarioStorageService) { }

  ngOnInit() {
    this.usuario = this.usuarioService.getUsuario();
    this.loadClientes();
  }

  private loadClientes(): void {
    const filtros = `idorg:eq:${this.usuario.idorg}~y~idsede:eq:${this.usuario.idsede}~y~estado:eq:0`;
    this.crudHttpService.paginacion('model/cliente', 'getpagination', this.pageMostar, this.rows, filtros, 'nombres', '', false, false).subscribe(
        (res: any) => {
          console.log(res);
          this.totalRecords = res.pages.totalCount;
          this.listClientes = <ClienteModel[]>res.data;
        }
      );
  }

  public page(event: PageEvent): void {
    this.rows = event.pageSize;
    this.pageMostar = event.pageIndex;
    // this.filtrar(this.ultimoParametroBuscado);
  }

  public removeItem( index: number ) {
    const idremove = this.listClientes[index].idcliente;
    this.rowIndexCondirmDelete = null;
    this.crudHttpService.update('', idremove, 'api/cliente', 'removeLogic').subscribe(res => {
      this.listClientes.splice(index, 1);
      this.listClientes = JSON.parse(JSON.stringify(this.listClientes));
    });
  }

}
