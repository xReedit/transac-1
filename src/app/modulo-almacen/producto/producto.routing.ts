import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoListComponent } from './producto-list/producto-list.component';
import { ProductoEditComponent } from './producto-edit/producto-edit.component';
import { ProductoMainComponent } from './producto-main/producto-main.component';


const routes: Routes = [
    {
      path : '', component : ProductoMainComponent,
      children : [
        {
          path : '', redirectTo : 'list'
        },
        {
            path : 'list', component : ProductoListComponent,
        },
        {path : 'edit' , component : ProductoEditComponent}
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProductoRoutingModule { }
