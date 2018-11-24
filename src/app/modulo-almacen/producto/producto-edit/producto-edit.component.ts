import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductoEditDetalleDialogComponent } from './producto-edit-detalle-dialog/producto-edit-detalle-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudHttpService } from 'src/app/shared/crud-http.service';

import swal from 'sweetalert2';
import { MSJ_SUCCESS, MSJ_LOADING } from '../../../shared/config/config.const';
import { ManagerErrorService } from '../../../shared/services/manager-error.service';

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.css']
})
export class ProductoEditComponent implements OnInit {
  _procesando = false;
  form: FormGroup;
  dataProductoDetalles: any = null;
  private listProductoDetalles: any = [];

  displayedColumns: string[] = ['#', 'Cod barra', 'Color', 'Talla', 'Stock', '-'];

  public rowIndexCondirmDelete: number = null; // index de la fila a eliminar , para mostrar la barra de confirmarcion

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private crudService: CrudHttpService,
    private managerErrorService: ManagerErrorService
    ) { }

  ngOnInit() {
    this.dataProductoDetalles = [];
    this.prepararFormulario();
  }

  prepararFormulario() {
    this.form = this.formBuilder.group({
      descripcion: ['', Validators.required],
      idcategoria: ['',  Validators.required],
      idmarca: ['' ,  Validators.required],
      precio1: ['' ,  [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]],
      precio2: ['' ,  [Validators.required, Validators.pattern('[0-9]+(\.[0-9][0-9]?)?')]],
      idorg: 'idorg',
      idsede: 'idsede',
      glosa: ''
    });
  }

  getOpenDialogDetalle() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '350px';

    const dialogRef = this.dialog.open(ProductoEditDetalleDialogComponent, dialogConfig);

    // subscribe al cierre y obtiene los datos
    dialogRef.afterClosed().subscribe(
      (res: any) => {
        if ( !res ) { return; }
        console.log(res);
        // this.listProductoDetalles[this.listProductoDetalles.length] = res;
        this.dataProductoDetalles = JSON.parse(JSON.stringify(res));
      }
    );
  }

  getTotalStock() {
    return this.dataProductoDetalles.map(t => t.stock_inicial).reduce((acc, value) => acc + value, 0);
  }

  public deleteRowLocalStorage(index): void {
    this.rowIndexCondirmDelete = null;
    this.dataProductoDetalles.splice(index, 1);
  }

  public GuardarProducto(): void {

    if (!this.form.valid || this._procesando) {return; }
    this._procesando = true;

    swal(MSJ_LOADING);

    this.form.controls['idcategoria'].setValue(this.form.controls['idcategoria'].value.idcategoria);
    this.form.controls['idmarca'].setValue(this.form.controls['idmarca'].value.idmarca);

    const data = JSON.stringify(this.form.value);
    console.log(data);

    this.crudService.create(data, 'api/producto', 'create').subscribe (
      (res: any) => {
      console.log(res);
      if (!res.success) { this.managerErrorService.ResError(res); return; }

      const idproducto = res.id[0];

      const dataListDetalle = JSON.stringify(this.dataProductoDetalles).replace(/-id-/g, idproducto);
      console.log(dataListDetalle);

      this.crudService.create(dataListDetalle, 'api/producto_detalle', 'create').subscribe(resp => {
        console.log('detalle ', resp);
        swal(MSJ_SUCCESS);
        this._procesando = false;
      });
    }, error => {
      this.managerErrorService.ResError(error);
    });
  }

}
