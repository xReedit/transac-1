import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudHttpService } from 'src/app/shared/crud-http.service';
import { UtilesService } from 'src/app/shared/services/utiles.service';

import { VentaDetallePagoModel } from 'src/app/models/venta.detalle.pago.model';
import { ClienteModel } from 'src/app/models/cliente.model';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { CuentasCobrarEditDialogPagarComponent } from './cuentas-cobrar-edit-dialog-pagar/cuentas-cobrar-edit-dialog-pagar.component';
import { RegistroCobroDetalleModel } from 'src/app/models/registro.pago.detalle.model';
import { RegistroCobroBitacoraModel } from 'src/app/models/registro.cobro.bitacora.model';

import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { CuentasCobrarEditDialogBitacoraComponent } from './cuentas-cobrar-edit-dialog-bitacora/cuentas-cobrar-edit-dialog-bitacora.component';

@Component({
  selector: 'app-cunetas-cobrar-edit',
  templateUrl: './cunetas-cobrar-edit.component.html',
  styleUrls: ['./cunetas-cobrar-edit.component.css']
})
export class CunetasCobrarEditComponent implements OnInit {
  id = 0;
  clienteSelect: ClienteModel = new ClienteModel();
  listCredito: VentaDetallePagoModel[] = [];
  listPagos: RegistroCobroDetalleModel[] = [];
  listBitacora: RegistroCobroBitacoraModel[] = [];

  deudaTotal = 0;

  rows = 10;
  totalRecordsPagos = 0;
  pageMostarPagos = 1;

  totalRecordsCreditos = 0;
  pageMostarCreditos = 1;

  totalRecordsBitacora = 0;
  pageMostarBitacora = 1;

  @ViewChild('paginadorHost') paginadorHost: MatPaginator;
  @ViewChild('paginadorHostA') paginadorHostA: MatPaginator;
  @ViewChild('paginadorHostB') paginadorHostB: MatPaginator;


  displayedColumns = ['#', 'fecha_compra', 'fecha_pago', 'tiempo', 'importe', 'pagado', 'diferencia'];
  displayedColumnsCobros = ['#', 'fecha_pago', 'tipo_pago', 'importe'];
  displayedColumnsBitacora = ['#', 'fecha', 'usuario', 'nota'];

  constructor(
    private dialog: MatDialog,
    private crudService: CrudHttpService,
    private activateRoute: ActivatedRoute,
    private utiliesService: UtilesService
  ) {
    this.activateRoute.params.subscribe(
      params => this.id = params['id']);
  }

  ngOnInit() {
    if (this.id) {
      this.loadDatos();
      this.loadPagos();
      this.loadBitacora();
    }

    this.paginadorHostA.hidePageSize = true;
    this.paginadorHostB.hidePageSize = true;
    this.paginadorHost._intl.itemsPerPageLabel = '';
    this.paginadorHost._intl.nextPageLabel = '';
    this.paginadorHost.hidePageSize = true;
  }

  private loadDatos(): void {
    const filtros = `venta.cliente.idcliente:eq:${this.id}~y~idtipo_pago:eq:3~y~estado:eq:0`;
    this.crudService.paginacion('model/venta_detalle_pago',
      'getpagination', this.pageMostarPagos, this.rows,
      filtros, 'idventa_detalle_pago', 'DESC', false, false)
      .subscribe((res: any) => {

        this.totalRecordsCreditos = res.pages.totalCount;
      this.listCredito = res.data;
      this.clienteSelect = this.listCredito[0].venta.cliente;

      this.getDeudaTotal();
    });
  }

  private loadPagos(): void {
    const filtros = `registro_cobro.idcliente:eq:${this.id}~y~estado:eq:0`;
    this.crudService.paginacion('model/registro_cobro_detalle',
    'getpagination', this.pageMostarPagos, this.rows,
    filtros, 'idregistro_cobro_detalle', 'DESC', false, false)
      .subscribe((res: any) => {
        this.listPagos = JSON.parse(JSON.stringify(res.data));
        this.totalRecordsPagos = res.pages.totalCount;
      });
  }

  private loadBitacora(): void {
    const filtros = `idcliente:eq:${this.id}~y~estado:eq:0`;
    this.crudService.paginacion('model/registro_cobro_bitacora',
      'getpagination', this.pageMostarPagos, this.rows,
      filtros, 'idregistro_cobro_bitacora', 'DESC', false, false)
      .subscribe((res: any) => {
        this.listBitacora = JSON.parse(JSON.stringify(res.data));
        this.totalRecordsBitacora = res.pages.totalCount;
      });
  }

  setFormatFecha(fecha: string): any {
    return this.utiliesService.cambiarFormatoFecha(fecha);
  }

  calcDiasTranscurridos(fecha: string): number {
    return this.utiliesService.diasTrasncurridos(fecha);
  }

  private getDeudaTotal(): void {
    this.deudaTotal = this.listCredito.map(t => t.diferencia).reduce((acc, value) => acc + parseFloat(value), 0);
  }

  getOpenDialogPago() {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.width = '350px';

    dialogConfig.data = {
      deudaTotal: this.deudaTotal,
      listDeuda: this.listCredito,
      idcliente: this.id
    };

    const dialogRef = this.dialog.open(CuentasCobrarEditDialogPagarComponent, dialogConfig);

    // subscribe al cierre y obtiene los datos
    dialogRef.afterClosed().subscribe(
      (res) => {
        if (!res) { return; }
        this.loadDatos();
      }
    );
  }


  getOpenDialogBitacora() {
    const dialogConfigBitacora = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfigBitacora.autoFocus = true;
    // dialogConfig.width = '350px';

    dialogConfigBitacora.data = {
      idcliente: this.id
    };

    const dialogRef = this.dialog.open(CuentasCobrarEditDialogBitacoraComponent, dialogConfigBitacora);

    // subscribe al cierre y obtiene los datos
    dialogRef.afterClosed().subscribe(
      (res) => {
        if (!res) { return; }
        this.loadBitacora();
      }
    );
  }

  public pagePagos(event: PageEvent): void {
    this.rows = event.pageSize;
    this.pageMostarPagos = event.pageIndex + 1;
    this.loadPagos();
  }

  public pageCreditos(event: PageEvent): void {
    this.rows = event.pageSize;
    this.pageMostarCreditos = event.pageIndex + 1;
    this.loadDatos();
  }

  public pageBitacora(event: PageEvent): void {
    this.rows = event.pageSize;
    this.pageMostarBitacora = event.pageIndex + 1;
    this.loadBitacora();
  }

}
