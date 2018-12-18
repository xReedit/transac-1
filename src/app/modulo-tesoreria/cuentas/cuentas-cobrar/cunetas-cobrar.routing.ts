import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CunetasCobrarMainComponent } from './cunetas-cobrar-main/cunetas-cobrar-main.component';
import { CunetasCobrarListComponent } from './cunetas-cobrar-list/cunetas-cobrar-list.component';
import { CunetasCobrarEditComponent } from './cunetas-cobrar-edit/cunetas-cobrar-edit.component';


const routes: Routes = [
        {
                path: '', component: CunetasCobrarMainComponent,
                children: [
                        {
                                path: '', redirectTo: 'list'
                        },
                        {
                                path: 'list', component: CunetasCobrarListComponent,
                        },
                        {
                                path: 'edit', component: CunetasCobrarEditComponent,
                        },
                ]
        }
];

@NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
})
export class CuentasCobrarRoutingModule { }
