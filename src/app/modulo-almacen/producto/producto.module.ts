import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductoRoutingModule } from './producto.routing';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ComponentesModule } from '../../componentes/componentes.module';
import { ProductoListComponent } from './producto-list/producto-list.component';
import { ProductoEditComponent } from './producto-edit/producto-edit.component';
import { ProductoMainComponent } from './producto-main/producto-main.component';
import { ProductoEditDetalleDialogComponent } from './producto-edit/producto-edit-detalle-dialog/producto-edit-detalle-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    ProductoRoutingModule,
    MaterialModule,
    MatDialogModule,
    HttpClientModule,
    ComponentesModule
  ],
  declarations: [
    ProductoListComponent,
    ProductoEditComponent,
    ProductoMainComponent,
    ProductoEditDetalleDialogComponent
  ],
  entryComponents: [ProductoEditDetalleDialogComponent]
})

export class ProductoModule { }
