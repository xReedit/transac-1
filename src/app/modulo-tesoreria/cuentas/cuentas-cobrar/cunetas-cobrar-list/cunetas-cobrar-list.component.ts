import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { VentaDetallePagoModel } from 'src/app/models/venta.detalle.pago.model';
import { CrudHttpService } from 'src/app/shared/crud-http.service';
import { UsuarioStorageService } from 'src/app/shared/services/usuario-storage.service';

@Component({
  selector: 'app-cunetas-cobrar-list',
  templateUrl: './cunetas-cobrar-list.component.html',
  styleUrls: ['./cunetas-cobrar-list.component.css']
})
export class CunetasCobrarListComponent implements OnInit {

  @ViewChild(MatPaginator) paginadorHost: MatPaginator;

  listClientesDeuda: any[] = [];
  displayedColumns = ['#', 'cliente', 'cantidad', 'dias_transcurrido', 'deuda', 'pagado', 'diferencia'];

  parametro_busqueda = '';
  showLista = true;

  constructor(
    private crudHttpService: CrudHttpService,
    private usuarioService: UsuarioStorageService
  ) { }

  ngOnInit() {
    // this.paginadorHost._intl.nextPageLabel = '';
    // this.paginadorHost._intl.previousPageLabel = '';
    // this.paginadorHost.hidePageSize = true;

    this.loadDatos();
  }

  private loadDatos(): void {
    const filter_cliente = '~y~`venta->cliente`.`nombres`,"":contains:' + this.parametro_busqueda;
    const filtros = `venta.idorg:eq:${this.usuarioService.getUsuario().idorg}~y~venta.idsede:eq:${this.usuarioService.getUsuario().idsede}${filter_cliente}`;


    this.crudHttpService.getAll('native/cliente', 'getCuentasPagarByClientes', false, false, true)
    .subscribe((res: any) => {
        console.log(res);
        this.listClientesDeuda = JSON.parse(JSON.stringify(res.data));
      });
  }

}
