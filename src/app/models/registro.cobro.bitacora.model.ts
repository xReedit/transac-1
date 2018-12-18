export class RegistroCobroBitacoraModel {
        constructor(
                public idregistro_cobro_bitacora: number = null,
                public idusuario: number = null,
                public idcliente: number = null,
                public fecha: string = null,
                public hora: string = null,
                public glosa: string = null,
                public estado: number = 0,
        ) {

        }
}
