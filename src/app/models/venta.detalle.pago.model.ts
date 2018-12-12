import { TipoPagoModel } from './tipopago.model';
export class VentaDetallePagoModel {
        constructor(
                public idventa_detalle_pago: number = null,
                public idventa: number = null,
                public idtipo_pago: number = null,
                public importe: string = null,
                public fecha_pago: string = null,
                public estado: number = 0,
                public tipo_pago: TipoPagoModel = null
        ) {

        }
}
