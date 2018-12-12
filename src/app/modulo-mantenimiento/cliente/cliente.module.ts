import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/shared/material/material.module';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

import { ClienteMainComponent } from './cliente-main/cliente-main.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteEditComponent } from './cliente-edit/cliente-edit.component';
import { ClienteRoutingModule } from './cliente.routing';

@NgModule({
  imports: [
    CommonModule,
    ClienteRoutingModule,
    FormsModule, ReactiveFormsModule,
    MaterialModule,
    ComponentesModule
  ],
  declarations: [ClienteMainComponent, ClienteListComponent, ClienteEditComponent]
})
export class ClienteModule { }
