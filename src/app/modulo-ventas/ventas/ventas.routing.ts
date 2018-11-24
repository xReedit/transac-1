import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VentaMainComponent } from './venta-main/venta-main.component';
import { VentaRapidaComponent } from './venta-rapida/venta-rapida.component';

const routes: Routes = [
        {
                path: '', component: VentaMainComponent,
                children: [
                        {
                                path: '', redirectTo: 'venta-rapida'
                        },
                        {
                                path: 'venta-rapida', component: VentaRapidaComponent,
                        },
                ]
        }
];

@NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
})
export class VentasRoutingModule { }
