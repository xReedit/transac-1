import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductoEditDetalleDialogComponent } from './producto-edit-detalle-dialog/producto-edit-detalle-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudHttpService } from 'src/app/shared/crud-http.service';

import { ProductoDetalleModel } from 'src/app/models/producto.detalle.model';
import { CategoriaModel } from '../../../models/categoria.model';
import { MarcaModel } from 'src/app/models/marca.model';

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
    private crudService: CrudHttpService
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
    return this.dataProductoDetalles.map(t => t.stock).reduce((acc, value) => acc + value, 0);
  }

  public deleteRowLocalStorage(index): void {
    this.rowIndexCondirmDelete = null;
    this.dataProductoDetalles.splice(index, 1);
  }

  public GuardarProducto(): void {

    this.form.controls['idcategoria'].setValue(this.form.controls['idcategoria'].value.idcategoria);
    this.form.controls['idmarca'].setValue(this.form.controls['idmarca'].value.idmarca);

    const data = JSON.stringify(this.form.value);
    console.log(data);

    this.crudService.create(data, 'api/producto', 'create').subscribe ((res: any) => {
      console.log(res);
      const idproducto = res[0];
    });
  }

}
