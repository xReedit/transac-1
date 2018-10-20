import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CompFindSedeComponent } from './comp-find-sede/comp-find-sede.component';
import { CompFindClienteComponent } from './comp-find-cliente/comp-find-cliente.component';
import { CompFindTipoPagoComponent } from './comp-find-tipo-pago/comp-find-tipo-pago.component';
import { CompFindCategoriaComponent } from './comp-find-categoria/comp-find-categoria.component';
import { CompFindTallaComponent } from './comp-find-talla/comp-find-talla.component';
import { CompFindMarcaComponent } from './comp-find-marca/comp-find-marca.component';
import { CompFindAlmacenComponent } from './comp-find-almacen/comp-find-almacen.component';
import { CompFindClienteListComponent } from './comp-find-cliente-list/comp-find-cliente-list.component';

import { MatInputModule, MatSelectModule, MatAutocompleteModule, MatPaginatorModule, MatProgressBarModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatIconModule
  ],
  declarations: [
    CompFindSedeComponent, 
    CompFindClienteComponent, 
    CompFindTipoPagoComponent, 
    CompFindCategoriaComponent, 
    CompFindTallaComponent, 
    CompFindMarcaComponent, 
    CompFindAlmacenComponent, 
    CompFindClienteListComponent
  ],
  exports: [
    CompFindSedeComponent,
    CompFindClienteComponent, 
    CompFindTipoPagoComponent, 
    CompFindCategoriaComponent, 
    CompFindTallaComponent, 
    CompFindMarcaComponent,
    CompFindAlmacenComponent,
    CompFindClienteListComponent
  ]
})
export class ComponentesModule { }
