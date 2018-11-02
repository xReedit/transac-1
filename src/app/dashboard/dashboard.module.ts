import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutes } from './dashboard.routing';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ComponentesModule } from '../componentes/componentes.module';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    ComponentesModule,
    MaterialModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
