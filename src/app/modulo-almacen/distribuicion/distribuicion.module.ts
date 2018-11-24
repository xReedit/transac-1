import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';

import { DistribuicionEditComponent } from './distribuicion-edit/distribuicion-edit.component';
import { DistribuicionListComponent } from './distribuicion-list/distribuicion-list.component';
import { DistribuicionRoutingModule } from './distribuicion.routing';
import { DistribuicionMainComponent } from './distribuicion-main/distribuicion-main.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    DistribuicionRoutingModule,
    MaterialModule,
    HttpClientModule,
    ComponentesModule
  ],
  declarations: [
    DistribuicionEditComponent,
    DistribuicionListComponent,
    DistribuicionMainComponent
  ]
})
export class DistribuicionModule { }
