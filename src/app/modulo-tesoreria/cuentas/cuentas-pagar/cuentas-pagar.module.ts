import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuentasPagarRoutingModule } from './cunetas-pagar.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

import { CuentasPagarMainComponent } from './cuentas-pagar-main/cuentas-pagar-main.component';
import { CuentasPagarListComponent } from './cuentas-pagar-list/cuentas-pagar-list.component';
import { CuentasPagarEditComponent } from './cuentas-pagar-edit/cuentas-pagar-edit.component';

@NgModule({
  imports: [
    CommonModule,
    CuentasPagarRoutingModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule,
    ComponentesModule
  ],
  declarations: [
    CuentasPagarMainComponent,
    CuentasPagarListComponent,
    CuentasPagarEditComponent
  ]
})
export class CuentasPagarModule { }
