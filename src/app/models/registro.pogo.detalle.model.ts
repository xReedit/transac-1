import { RegistroPagoModel } from './registro.pago.mdel';
import { TipoPagoModel } from './tipopago.model';

export class RegistroPagoDetalleModel {
        constructor(
                public idregistro_pago_detalle: number = null,
                public idregistro_pago: number = null,
                public idtipo_pago: number = null,
                public fecha_pago: number = null,
                public importe: string = null,
                public estado: number = 0,
                public registro_pago: RegistroPagoModel = null,
                public tipo_pago: TipoPagoModel = null,
        ) {

        }
}
