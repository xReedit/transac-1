import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductoStockModel } from '../../../models/producto.stock.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilesService } from '../../../shared/services/utiles.service';
import { CrudHttpService } from '../../../shared/crud-http.service';

import { MSJ_LOADING, MSJ_SUCCESS, MSJ_ERROR } from '../../../shared/config/config.const';
import swal from 'sweetalert2';
import { ManagerErrorService } from '../../../shared/services/manager-error.service';

@Component({
  selector: 'app-distribuicion-edit',
  templateUrl: './distribuicion-edit.component.html',
  styleUrls: ['./distribuicion-edit.component.css']
})
export class DistribuicionEditComponent implements OnInit {

  @ViewChild('txtCantidad') txtCantidad: ElementRef;
  @ViewChild('txtProducto') txtProducto: ElementRef;

  ListaProducto: any = [];
  productoStockSelect: ProductoStockModel = null;
  hayProducto = false;
  _procesando = false;

  private stockActualProductoSelect = 0;
  public form: FormGroup;

  displayedColumns = ['#', 'producto',  'cantidad', '-'];
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
    // para distribuicion
    this.form = this.formBuilder.group({
      fecha: this.utilesService.getDateString(null),
      idorg: '',
      idsede: '',
      idalmacen_d: ['', Validators.required],
      idalmacen_a: ['', Validators.required],
      idusuario: ''
    });
  }

  Guardar(): void {
    console.log(this.form.value);

    if (!this.form.valid || this._procesando) { return; }
    this._procesando = true;

    swal(MSJ_LOADING);

    const data = JSON.stringify(this.form.value);
    this.crudService.create(data, 'api/distribuicion')
    .subscribe ( (res: any) => {
      if (!res.success) { this.managerErrorService.ResError(res); this._procesando = false; return; }

      // preparamos distribuicion_detalle para guardar
      const iddistribuicion = res.id[0];
      const dataDIstribuicionDetalle = JSON.stringify(this.getDataDistribuicionDetalle(iddistribuicion));

      this.crudService.create(dataDIstribuicionDetalle, 'api/distribuicion_detalle')
      .subscribe( (resp: any) => {
        this._procesando = false;
        if (!resp.success) { this.managerErrorService.ResError(resp); return; }

        console.log('detalle ', resp);
        swal(MSJ_SUCCESS);
        this.ListaProducto = [];
      });
    });
  }

  selectContent(): void {
    this.txtCantidad.nativeElement.select();
  }

  _getObjectList(event: any) {
    console.log('distribuicion: ', event);
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
      this.ListaProducto.push({ 'producto_stock': this.productoStockSelect, 'cantidad': cantidad });
    } else {// existe
      this.ListaProducto[indexProductoExiste].cantidad += cantidad;
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

  // obtiene los datos que van a distribuicion_detalle
  private getDataDistribuicionDetalle(iddistribuicion: number): any {
    const arr: any = [];

    this.ListaProducto.map(x =>
      arr.push({
        iddistribuicion: iddistribuicion,
        idproducto_stock: x.producto_stock.idproducto_stock,
        idproducto_detalle: x.producto_stock.producto_detalle.idproducto_detalle,
        cantidad: x.cantidad
        })
        );

    return arr;
  }

}
