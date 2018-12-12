import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductoStockModel } from 'src/app/models/producto.stock.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilesService } from '../../../shared/services/utiles.service';
import { CrudHttpService } from '../../../shared/crud-http.service';
import { ManagerErrorService } from '../../../shared/services/manager-error.service';
import { ClienteModel } from '../../../models/cliente.model';
import { VentaDetallePagoModel } from 'src/app/models/venta.detalle.pago.model';
import { MSJ_LOADING, MSJ_SUCCESS } from '../../../shared/config/config.const';
import { CompGetPagoComponent } from '../../../componentes/comp-get-pago/comp-get-pago.component';
import { CompFindClienteRucDniComponent } from '../../../componentes/comp-find-cliente-ruc-dni/comp-find-cliente-ruc-dni.component';
import swal from 'sweetalert2';


@Component({
  selector: 'app-venta-rapida',
  templateUrl: './venta-rapida.component.html',
  styleUrls: ['./venta-rapida.component.css']
})
export class VentaRapidaComponent implements OnInit {

  @ViewChild('txtCantidad') txtCantidad: ElementRef;
  @ViewChild('txtProducto') txtProducto: ElementRef;
  @ViewChild('compPago') compPago: CompGetPagoComponent;
  @ViewChild('compCliente') compCliente: CompFindClienteRucDniComponent;

  ListaProducto: any = [];
  productoStockSelect: ProductoStockModel = null;
  hayProducto = false;
  hayPagoValido = false;
  _procesando = false;
  valTipoPrecioSel = '1';
  montoPagar = 0;

  childPago = false;

  listFormaPago: VentaDetallePagoModel[];
  clienteSelect: ClienteModel;

  private stockActualProductoSelect = 0;
  public formVenta: FormGroup;

  displayedColumns = ['#', 'producto', 'cantidad', 'total', 'accion'];
  public rowIndexCondirmDelete: number = null; // index de la fila a eliminar , para mostrar la barra de confirmarcion

  constructor(
    private formBuilder: FormBuilder,
    private utilesService: UtilesService,
    private crudService: CrudHttpService,
    private managerErrorService: ManagerErrorService
  ) { }

  ngOnInit() {
    this.prepararFormulario();
  }

  prepararFormulario(): void {
    // para venta
    this.formVenta = this.formBuilder.group({
      idventa: null,
      fecha: '?',
      hora: '?',
      idorg: '?',
      idsede: '?',
      idusuario: '?',
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

    const cant = this.txtCantidad.nativeElement.value;
    const cantidad = isNaN(parseFloat(cant)) ? 0 : parseFloat(cant);
      setTimeout(() => {
        if (cantidad <= 0) {
            this.txtCantidad.nativeElement.focus();
            return;
        }

        this.AddProducto(cantidad.toString());
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

    const nom_tipo_precio = `precio${this.valTipoPrecioSel}`;
    const punitario = parseFloat(this.productoStockSelect.producto_detalle.producto[nom_tipo_precio]);

    // tslint:disable-next-line:prefer-const
    let indexProductoExiste: number;
    this.ListaProducto.map((x, index) => { if (x.producto_stock.idproducto_stock === this.productoStockSelect.idproducto_stock) { return indexProductoExiste = index; } });


    if (indexProductoExiste === undefined) {// nuevo
      const total = cantidad * punitario;

      this.ListaProducto.push({ 'producto_stock': this.productoStockSelect, 'tipo_precio': this.valTipoPrecioSel, 'cantidad': cantidad, 'punitario': punitario, 'total': total });
    } else {// existe

      let cantidad_row = this.ListaProducto[indexProductoExiste].cantidad;
      cantidad_row += cantidad;

      const total = cantidad_row * punitario;
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
    if (this.ListaProducto === null) { this.montoPagar = 0; return 0; }
    this.montoPagar = this.ListaProducto.map(t => t.total).reduce((acc, value) => acc + value, 0);
    return this.montoPagar;
  }

  verPanelPago(): void { this.childPago = true; console.log(this.childPago); }
  verPanelProducto(): void {this.childPago = false;  }

  _getFormaPago(event): void {
    this.listFormaPago = event;
    console.log('forma de pago ', event);
  }

  _getCliente(event): void {
    this.clienteSelect = event;
    console.log('cliente ', event);
  }


  /// guardar
  guardarVenta (): void {
    swal(MSJ_LOADING);
    const idcliente = this.clienteSelect.idcliente || null;
    this.formVenta.controls['idcliente'].patchValue(idcliente);
    this.formVenta.controls['total'].patchValue(100);

    const data = JSON.stringify(this.formVenta.value);
    console.log(data);
    this.crudService.create(data, 'model/venta', 'create').subscribe(
      (res: any) => {
        console.log(res);
        if (!res.success) { this.managerErrorService.ResError(res); return; }

        const idventa = res.data.idventa;

        this.guardarVentaDetalle(idventa);
      });
  }

  private guardarVentaDetalle(idventa: number): void {
    let data_venta_detalle = this.ListaProducto.map((x) => {
      return {
        idventa_detalle: null,
        idventa: idventa,
        idproducto_stock: x.producto_stock.idproducto_stock,
        idproducto_detalle: x.producto_stock.idproducto_detalle,
        tipo_precio: x.tipo_precio,
        punitario: x.punitario,
        cantidad: x.cantidad,
        total: x.total
      };
    });
    // setear para guardar

    data_venta_detalle = JSON.stringify(data_venta_detalle);
    console.log(data_venta_detalle);
    this.crudService.create(data_venta_detalle, 'model/venta_detalle', 'create').subscribe(res => {
      console.log(res);
      if (!res.success) { this.managerErrorService.ResError(res); return; }
      this.guardarVentaDetallePago(idventa);
    });
  }

  private guardarVentaDetallePago(idventa: number): void {
    this.listFormaPago.map( x => x.idventa = idventa);
    const data_pago = JSON.stringify(this.listFormaPago);
    console.log(data_pago);
    this.crudService.create(data_pago, 'model/venta_detalle_pago', 'create').subscribe(res => {
      console.log(res);
      if (!res.success) { this.managerErrorService.ResError(res); return; }

      this.nuevaVenta();
      swal(MSJ_SUCCESS);
    });
  }
  ///


  private nuevaVenta(): void {
    this.childPago = false;
    this.listFormaPago = [];
    this.ListaProducto = [];
    this.clienteSelect = null;

    this.compPago.nuevo();
    this.compCliente.nuevo();
  }

}
