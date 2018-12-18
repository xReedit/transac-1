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
          loadChildren: './modulo-almacen/producto/producto.module#ProductoModule'
        },
        {
          path: 'almacen/distribuicion',
          loadChildren: './modulo-almacen/distribuicion/distribuicion.module#DistribuicionModule'
        },
        {
          path: 'ventas/venta',
          loadChildren: './modulo-ventas/ventas/ventas.module#VentasModule'
        },
        // mantenimientos
        {
          path: 'maestro/cliente',
          loadChildren: './modulo-mantenimiento/cliente/cliente.module#ClienteModule'
        },
         // TESORERIA
        {
          path: 'cuentas/cuentas-por-pagar',
          loadChildren: './modulo-tesoreria/cuentas/cuentas-pagar/cuentas-pagar.module#CuentasPagarModule'
        },
        {
          path: 'cuentas/cuentas-por-cobrar',
          loadChildren: './modulo-tesoreria/cuentas/cuentas-cobrar/cuentas-cobrar.module#CuentasCobrarModule'
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

