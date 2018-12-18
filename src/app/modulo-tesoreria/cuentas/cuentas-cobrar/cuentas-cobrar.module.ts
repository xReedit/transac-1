import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';

import { CunetasCobrarMainComponent } from './cunetas-cobrar-main/cunetas-cobrar-main.component';
import { CunetasCobrarListComponent } from './cunetas-cobrar-list/cunetas-cobrar-list.component';
import { CunetasCobrarEditComponent } from './cunetas-cobrar-edit/cunetas-cobrar-edit.component';
import { CuentasCobrarRoutingModule } from './cunetas-cobrar.routing';
import { CuentasCobrarEditDialogPagarComponent } from './cunetas-cobrar-edit/cuentas-cobrar-edit-dialog-pagar/cuentas-cobrar-edit-dialog-pagar.component';
import { CuentasCobrarEditDialogBitacoraComponent } from './cunetas-cobrar-edit/cuentas-cobrar-edit-dialog-bitacora/cuentas-cobrar-edit-dialog-bitacora.component';



@NgModule({
  imports: [
    CommonModule,
    CuentasCobrarRoutingModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule,
    MatTabsModule,
    MatDialogModule,
    ComponentesModule
  ],
  declarations: [
    CunetasCobrarMainComponent,
    CunetasCobrarListComponent,
    CunetasCobrarEditComponent,
    CuentasCobrarEditDialogPagarComponent,
    CuentasCobrarEditDialogBitacoraComponent
  ],
  entryComponents: [
    CuentasCobrarEditDialogPagarComponent,
    CuentasCobrarEditDialogBitacoraComponent
  ]
})
export class CuentasCobrarModule { }
