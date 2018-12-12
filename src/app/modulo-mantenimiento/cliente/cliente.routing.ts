import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteMainComponent } from './cliente-main/cliente-main.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteEditComponent } from './cliente-edit/cliente-edit.component';


const routes: Routes = [
        {
                path: '', component: ClienteMainComponent,
                children: [
                        {
                                path: '', redirectTo: 'list'
                        },
                        {
                                path: 'list', component: ClienteListComponent,
                        },
                        {
                                path: 'edit', component: ClienteEditComponent,
                        },
                ]
        }
];

@NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
})
export class ClienteRoutingModule { }
