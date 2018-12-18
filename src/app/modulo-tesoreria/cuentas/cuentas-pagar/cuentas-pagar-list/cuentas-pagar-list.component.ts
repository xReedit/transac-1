import { Component, OnInit, ViewChild } from '@angular/core';
import { VentaDetallePagoModel } from '../../../../models/venta.detalle.pago.model';
import { CrudHttpService } from 'src/app/shared/crud-http.service';
import { UsuarioStorageService } from 'src/app/shared/services/usuario-storage.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-cuentas-pagar-list',
  templateUrl: './cuentas-pagar-list.component.html',
  styleUrls: ['./cuentas-pagar-list.component.css']
})
export class CuentasPagarListComponent implements OnInit {

 @ViewChild(MatPaginator) paginadorHost: MatPaginator;

  listVentaDetallePago: VentaDetallePagoModel[] = [];
  displayedColumns = ['#', 'cliente', 'fecha', 'tiempo_transcurrido', 'deuda', 'pagado', 'diferencia'];
  totalRecords = 0;
  rows = 10;
  pageMostar = 1;

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

    this.crudHttpService.paginacion('model/venta_detalle_pago', 'getpagination', this.pageMostar, this.rows, filtros,
      'idventa_detalle_pago', 'desc', false, false).subscribe((res: any) => {
        console.log(res);
        this.listVentaDetallePago = JSON.parse(JSON.stringify(res.data));
        this.totalRecords = res.pages.totalCount;
      });
  }

}
