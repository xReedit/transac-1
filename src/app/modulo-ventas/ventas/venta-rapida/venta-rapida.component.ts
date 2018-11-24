import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductoStockModel } from 'src/app/models/producto.stock.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilesService } from '../../../shared/services/utiles.service';
import { CrudHttpService } from '../../../shared/crud-http.service';
import { ManagerErrorService } from '../../../shared/services/manager-error.service';


@Component({
  selector: 'app-venta-rapida',
  templateUrl: './venta-rapida.component.html',
  styleUrls: ['./venta-rapida.component.css']
})
export class VentaRapidaComponent implements OnInit {

  @ViewChild('txtCantidad') txtCantidad: ElementRef;
  @ViewChild('txtProducto') txtProducto: ElementRef;

  ListaProducto: any = [];
  productoStockSelect: ProductoStockModel = null;
  hayProducto = false;
  _procesando = false;

  private stockActualProductoSelect = 0;
  public formVenta: FormGroup;

  displayedColumns = ['#', 'producto', 'precio', 'cantidad', '-'];
  public rowIndexCondirmDelete: number = null; // index de la fila a eliminar , para mostrar la barra de confirmarcion

  constructor(
    private formBuilder: FormBuilder,
    private utilesService: UtilesService,
    private crudService: CrudHttpService,
    private managerErrorService: ManagerErrorService
  ) { }

  ngOnInit() {
  }

  prepararFormulario(): void {
    // para venta
    this.formVenta = this.formBuilder.group({
      fecha: '',
      hora: '',
      idorg: '',
      idsede: '',
      idusuario: '',
      idcliente: '',
      dsct: '',
      total: ''
    });
  }

  selectContent(): void {
    this.txtCantidad.nativeElement.select();
  }

  _getObjectList(event: any) {
    if (event === null) { this.hayProducto = false; return; }

    this.productoStockSelect = event;

    this.stockActualProductoSelect = parseFloat(this.productoStockSelect.stock);

    this.hayProducto = true;
    setTimeout(() => {
      this.txtCantidad.nativeElement.focus();
    }, 300);


  }

  private nuevoItem(): void {
    this.productoStockSelect = null;
    this.txtCantidad.nativeElement.value = '1';
    const comp_find_producto: any = document.querySelector('app-comp-find-producto-list input');
    comp_find_producto.value = '';
    comp_find_producto.focus();
    this.hayProducto = false;
  }

  AddProducto(cant: string): void {
    const cantidad = isNaN(parseFloat(cant)) ? 0 : parseFloat(cant);
    if (cantidad <= 0 || this.productoStockSelect === null) { return; }


    // buscar si producto existe
    // tslint:disable-next-line:prefer-const
    let indexProductoExiste: number;
    this.ListaProducto.map((x, index) => { if (x.producto_stock.idproducto_stock === this.productoStockSelect.idproducto_stock) { return indexProductoExiste = index; } });

    if (indexProductoExiste === undefined) {// nuevo
      const punitario = parseFloat(this.productoStockSelect.producto_detalle.producto.precio1);
      const total = cantidad * punitario;

      this.ListaProducto.push({ 'producto_stock': this.productoStockSelect, 'tipo_precio': 1, 'cantidad': cantidad, 'punitario': punitario, 'total': total });
    } else {// existe

      // const index_tipo_precio = this.ListaProducto[indexProductoExiste].tipo_precio;
      // const nomTipoPrecio = `precio${index_tipo_precio}`;

      const punitario = this.ListaProducto[indexProductoExiste].punitario;
      let cantidad_row = this.ListaProducto[indexProductoExiste].cantidad;
      cantidad_row += cantidad;

      const total = cantidad_row * parseFloat(punitario);
      this.ListaProducto[indexProductoExiste].cantidad = cantidad_row;
      this.ListaProducto[indexProductoExiste].punitario = punitario;
      this.ListaProducto[indexProductoExiste].total = total;
    }
    this.ListaProducto = JSON.parse(JSON.stringify(this.ListaProducto));

    console.log(this.ListaProducto);

    this.nuevoItem();
  }

  removeItem(index: number): void {
    this.rowIndexCondirmDelete = null;
    this.ListaProducto.splice(index, 1);
    this.ListaProducto = JSON.parse(JSON.stringify(this.ListaProducto));
  }

  getTotalCantidad() {
    if (this.ListaProducto === null) { return 0; }
    return this.ListaProducto.map(t => t.cantidad).reduce((acc, value) => acc + value, 0);
  }

  getTotalTotal() {
    if (this.ListaProducto === null) { return 0; }
    return this.ListaProducto.map(t => t.total).reduce((acc, value) => acc + value, 0);
  }

}
