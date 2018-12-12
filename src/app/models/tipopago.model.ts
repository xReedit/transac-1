export class TipoPagoModel {
    constructor(
        public idtipo_pago: number = null,
        public descripcion: string = null,
        public cuenta: number = 0,
        public requiere_cliente: number = 0,
        public requiere_fecha: number = 0,
        public estado: number = 0
    ) {
    }
}
