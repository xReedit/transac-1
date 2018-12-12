
export class RegistroPagoModel {
        constructor(
                public idregistro_pago: number = null,
                public idventa: number = null,
                public idcliente: number = null,
                public idusuario: string = null,
                public idorg: number = 0,
                public idsede: number = null,
                public fecha: string = null,
                public hora: string = null,
                public total: string = null,
                public estado: number = 0,
        ) {

        }
}
