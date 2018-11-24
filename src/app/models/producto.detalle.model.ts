import { MarcaModel } from './marca.model';
import { ProductoModel } from './producto.model';

export class ProductoDetalleModel {
    constructor(
        public idproducto_detalle: number = null,
        public idproducto: number = null,
        public codigobarra: string = null,
        public color: string = null,
        public idmarca: MarcaModel = null,
        public estado: number = 0,
        public producto: ProductoModel
    ) {

    }
}
