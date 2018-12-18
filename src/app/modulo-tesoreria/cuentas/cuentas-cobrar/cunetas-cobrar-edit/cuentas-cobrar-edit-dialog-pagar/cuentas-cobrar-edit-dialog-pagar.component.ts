import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudHttpService } from 'src/app/shared/crud-http.service';

import { VentaDetallePagoModel } from 'src/app/models/venta.detalle.pago.model';
import { RegistroCobroModel } from '../../../../../models/registro.cobro.model';
import { ManagerErrorService } from '../../../../../shared/services/manager-error.service';
import { RegistroPagoDetalleModel } from 'src/app/models/registro.pogo.detalle.model';
import { RegistroCobroDetalleModel } from '../../../../../models/registro.pago.detalle.model';
import swal from 'sweetalert2';
import { MSJ_LOADING } from 'src/app/shared/config/config.const';
import { MSJ_SUCCESS } from '../../../../../shared/config/config.const';

@Component({
  selector: 'app-cuentas-cobrar-edit-dialog-pagar',
  templateUrl: './cuentas-cobrar-edit-dialog-pagar.component.html',
  styleUrls: ['./cuentas-cobrar-edit-dialog-pagar.component.css']
})
export class CuentasCobrarEditDialogPagarComponent implements OnInit {

  deudaTotal: number;
  idcliente: number;
  listDeuda: VentaDetallePagoModel[] = [];

  private montoRecibido = 0;
  private listTipoPago: VentaDetallePagoModel[] = [];
  constructor(
    private crudService: CrudHttpService,
    private managerErrorService: ManagerErrorService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.deudaTotal = data.deudaTotal;
    this.listDeuda = data.listDeuda;
    this.idcliente = data.idcliente;
  }

  ngOnInit() {
  }

  _getFormaPago(event) {
    this.listTipoPago = event;
  }

  _getTotalRecibido(event) {
    this.montoRecibido = event;
  }

  registrarPagoDeuda(): void {
    // cocinar venta_detalle_pago
    let montoRestante = this.montoRecibido;
    const listDeudaGrabar: VentaDetallePagoModel[] = [];

    this.listDeuda.map(item => {
      if (montoRestante > 0) {
        const importe_item = parseFloat(item.diferencia);
        let diferencia = importe_item - montoRestante;
        diferencia = diferencia < 0 ? 0 : diferencia;

        let importe_pagado = parseFloat(item.importe) - diferencia;

        importe_pagado = importe_pagado < 0 ? importe_item : importe_pagado;

        const estado = diferencia === 0 ? 1 : 0;


        item.pagado = importe_pagado.toString();
        item.diferencia = diferencia.toString();
        item.estado = estado;
        listDeudaGrabar.push(item);

        montoRestante -= importe_item;
        }
        return;
      });

    const data = JSON.stringify(listDeudaGrabar);
    this.grabarPago(data);
  }

  private grabarPago(data: any): void {
    const registroCobro: RegistroCobroModel = new RegistroCobroModel();
    registroCobro.fecha = '?';
    registroCobro.hora = '?';
    registroCobro.idcliente = this.idcliente;
    registroCobro.importe = this.montoRecibido.toString();

    const _dataRegistroCobro = JSON.stringify(registroCobro);


    swal(MSJ_LOADING);
    this.crudService.create(registroCobro, 'model/registro_cobro', 'create')
    .subscribe((res: any) => {
      if (!res.success) { this.managerErrorService.ResError(res); return; }

      // grabamos los detalles del cobro
      const idRegitroCobro = res.data.idregistro_cobro;
      const listRegistroPagoDetalle = this.setearRegistroPagoDetalle(idRegitroCobro);
      this.crudService.create(listRegistroPagoDetalle, 'model/registro_cobro_detalle', 'create')
      .subscribe((rpt_detalle: any) => {
        if (!rpt_detalle.success) { this.managerErrorService.ResError(res); return; }

        // actualizamos los pagos
        this.crudService.update(data, 0, 'model/venta_detalle_pago', 'update')
          .subscribe(res_update => {
            if (!res_update.success) { this.managerErrorService.ResError(res); return; }
            swal(MSJ_SUCCESS);

            this.dialogRef.close(true);
          });
      });

    });
  }

  private setearRegistroPagoDetalle(idregistro_cobro: number): RegistroCobroDetalleModel[] {
    // tslint:disable-next-line:prefer-const
    let listRegistroPagoDetalle: RegistroCobroDetalleModel[] = [];
    this.listTipoPago.map( x => {
      const itemRpD: RegistroCobroDetalleModel = new RegistroCobroDetalleModel();
      itemRpD.idregistro_cobro = idregistro_cobro;
      itemRpD.idtipo_pago = x.idtipo_pago;
      itemRpD.importe = x.importe;

      listRegistroPagoDetalle.push(itemRpD);
    });

    return listRegistroPagoDetalle;
  }
}
