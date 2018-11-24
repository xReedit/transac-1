import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DistribuicionListComponent } from './distribuicion-list/distribuicion-list.component';
import { DistribuicionEditComponent } from './distribuicion-edit/distribuicion-edit.component';
import { DistribuicionMainComponent } from './distribuicion-main/distribuicion-main.component';

const routes: Routes = [
        {
                path: '', component: DistribuicionMainComponent,
                children: [
                        {
                                path: '', redirectTo: 'list'
                        },
                        {
                                path: 'list', component: DistribuicionListComponent,
                        },
                        { path: 'edit', component: DistribuicionEditComponent }
                ]
        }
];

@NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
})
export class DistribuicionRoutingModule { }
