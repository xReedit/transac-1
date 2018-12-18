import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CuentasPagarMainComponent } from './cuentas-pagar-main/cuentas-pagar-main.component';
import { CuentasPagarListComponent } from './cuentas-pagar-list/cuentas-pagar-list.component';
import { CuentasPagarEditComponent } from './cuentas-pagar-edit/cuentas-pagar-edit.component';


const routes: Routes = [
        {
                path: '', component: CuentasPagarMainComponent,
                children: [
                        {
                                path: '', redirectTo: 'cuenta-pagar-list'
                        },
                        {
                                path: 'cuenta-pagar-list', component: CuentasPagarListComponent,
                        },
                        {
                                path: 'cuenta-pagar-edit', component: CuentasPagarEditComponent,
                        },
                ]
        }
];

@NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
})
export class CuentasPagarRoutingModule { }
