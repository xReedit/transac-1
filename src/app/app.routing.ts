import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './core/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './core/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/guard/auth.guard';

export const AppRoutes: Routes = [
    {
      path: '',
      canActivate: [AuthGuard],
      component: AdminLayoutComponent,
      children: [
        {
          path: '',
          loadChildren: './dashboard/dashboard.module#DashboardModule',
          // canActivate: [AuthGuard],
          data : {'tituloModulo': 'Inicio'}
        },
        {
          path: 'almacen/producto',
          // path: '',
          loadChildren: './modulo-almacen/producto/producto.module#ProductoModule'
        },
        {
          path: 'almacen/distribuicion',
          // path: '',
          loadChildren: './modulo-almacen/distribuicion/distribuicion.module#DistribuicionModule'
        },
        {
          path: 'ventas/venta',
          // path: '',
          loadChildren: './modulo-ventas/ventas/ventas.module#VentasModule'
        }
      ]
    },
    {
      path: '',
      component: AuthLayoutComponent,
      children: [{
        path: 'session',
        loadChildren: './session/session.module#SessionModule'
      }]
    }
];

