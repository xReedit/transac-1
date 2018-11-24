import { AlmacenModel } from './almacen.model';
import { ProductoDetalleModel } from 'src/app/models/producto.detalle.model';

export class ProductoStockModel {
        constructor(
                public idproducto_stock: number = null,
                public idproducto_detalle: number = null,
                public idalmacen: number = null,
                public stock: string = null,
                public estado: number = 0,
                public alamcen: AlmacenModel = null,
                public producto_detalle: ProductoDetalleModel = null
        ) {

        }
}
