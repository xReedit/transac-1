import { ClienteModel } from 'src/app/models/cliente.model';
export class VentaModel {
        constructor(
                public idventa: number = null,
                public idorg: number = null,
                public idsede: number = null,
                public idusuario: number = null,
                public idcliente: number = null,
                public fecha: string = null,
                public hora: string = null,
                public dsct: string = null,
                public total: string = null,
                public estado: number = 0,
                public cliente: ClienteModel = null,
        ) {

        }
}
