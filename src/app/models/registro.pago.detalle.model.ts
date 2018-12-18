import { RegistroCobroModel } from './registro.cobro.model';


export class RegistroCobroDetalleModel {
        constructor(
                public idregistro_cobro_detalle: number = null,
                public idregistro_cobro: number = null,
                public idtipo_pago: number = null,
                public importe: string = null,
                public estado: number = 0,
                public registro_cobro: RegistroCobroModel = null,
        ) {

        }
}