import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';

import { CompFindSedeComponent } from './comp-find-sede/comp-find-sede.component';
import { CompFindClienteComponent } from './comp-find-cliente/comp-find-cliente.component';
import { CompFindTipoPagoComponent } from './comp-find-tipo-pago/comp-find-tipo-pago.component';
import { CompFindCategoriaComponent } from './comp-find-categoria/comp-find-categoria.component';
import { CompFindTallaComponent } from './comp-find-talla/comp-find-talla.component';
import { CompFindMarcaComponent } from './comp-find-marca/comp-find-marca.component';
import { CompFindAlmacenComponent } from './comp-find-almacen/comp-find-almacen.component';
import { CompFindClienteListComponent } from './comp-find-cliente-list/comp-find-cliente-list.component';

import { CompBtnSuccessComponent } from './comp-btn-success/comp-btn-success.component';
import { CompBtnCancelComponent } from './comp-btn-cancel/comp-btn-cancel.component';
import { CompFindProductoListComponent } from './comp-find-producto-list/comp-find-producto-list.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule

  ],
  declarations: [
    CompFindSedeComponent,
    CompFindClienteComponent,
    CompFindTipoPagoComponent,
    CompFindCategoriaComponent,
    CompFindTallaComponent,
    CompFindMarcaComponent,
    CompFindAlmacenComponent,
    CompFindClienteListComponent,
    CompBtnSuccessComponent,
    CompBtnCancelComponent,
    CompFindProductoListComponent
  ],
  exports: [
    CompFindSedeComponent,
    CompFindClienteComponent,
    CompFindTipoPagoComponent,
    CompFindCategoriaComponent,
    CompFindTallaComponent,
    CompFindMarcaComponent,
    CompFindAlmacenComponent,
    CompFindClienteListComponent,
    CompBtnSuccessComponent,
    CompBtnCancelComponent,
    CompFindProductoListComponent
  ]
})
export class ComponentesModule { }
