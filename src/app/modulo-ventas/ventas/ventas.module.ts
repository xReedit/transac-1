import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';

import { VentasRoutingModule } from './ventas.routing';
import { VentaRapidaComponent } from './venta-rapida/venta-rapida.component';
import { VentaMainComponent } from './venta-main/venta-main.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    VentasRoutingModule,
    MaterialModule,
    HttpClientModule,
    ComponentesModule
  ],
  declarations: [
    VentaRapidaComponent,
    VentaMainComponent
  ]
})
export class VentasModule { }
