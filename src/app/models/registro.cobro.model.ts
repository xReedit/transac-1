export class RegistroCobroModel {
        constructor(
                public idregistro_cobro: number = null,
                public idcliente: number = null,
                public idusuario: number = null,
                public idorg: number = null,
                public idsede: number = null,
                public fecha: string = null,
                public hora: string = null,
                public importe: string = null,
                public estado: number = 0,
        ) {

        }
}
