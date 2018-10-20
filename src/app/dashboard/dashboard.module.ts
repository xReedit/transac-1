import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutes } from './dashboard.routing';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ComponentesModule } from '../componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    ComponentesModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
