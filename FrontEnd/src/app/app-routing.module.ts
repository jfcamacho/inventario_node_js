import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './administracion/usuarios/usuarios.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppMainComponent } from './layout/app.main.component';
import { CRUDusuariosComponent } from './administracion/crudusuarios/crudusuarios.component';
import { LoginComponent } from './login/login.component';
import { accesoGuard } from './guards/acceso.guard';
import { CategoriaComponent } from './configuracion/categoria/categoria.component';
import { UnidadComponent } from './configuracion/unidad/unidad.component';
import { PagoComponent } from './configuracion/pago/pago.component';
import { ProveedorComponent } from './inventario/proveedor/proveedor.component';
import { InventarioComponent } from './inventario/inventario/inventario.component';
import { FacturaComponent } from './inventario/factura/factura.component';
import { CompraComponent } from './inventario/compra/compra.component';
import { VentaComponent } from './inventario/venta/venta.component';
import { ProveedoresComponent } from './inventario/proveedor/proveedores.component';
import { ProductoComponent } from './inventario/inventario/producto.component';

const routes: Routes = [
  { path: 'SOFT', component: AppMainComponent, 
    children: [
      {path: 'home', component: DashboardComponent, canActivate: [accesoGuard]},
      {path: 'administracion', 
      children: [
        {path: 'usuarios', component: UsuariosComponent, canActivate: [accesoGuard]},
        {path: 'usuario', component: CRUDusuariosComponent, canActivate: [accesoGuard]},
        {path: 'usuario/:idUsuario', component: CRUDusuariosComponent, canActivate: [accesoGuard]},
      ], canActivate: [accesoGuard]},
      {path: 'configuracion', 
      children: [
        {path: 'categoria', component: CategoriaComponent, canActivate: [accesoGuard]},
        {path: 'unidad', component: UnidadComponent, canActivate: [accesoGuard]},
        {path: 'pago', component: PagoComponent, canActivate: [accesoGuard]},
      ], canActivate: [accesoGuard]},
      {path: 'inventario', 
      children: [
        {path: 'productos', component: InventarioComponent, canActivate: [accesoGuard]},
        {path: 'producto/:idProducto', component: ProductoComponent, canActivate: [accesoGuard]},
        {path: 'proveedores', component: ProveedoresComponent, canActivate: [accesoGuard]},
        {path: 'proveedor/:idProveedor', component: ProveedorComponent, canActivate: [accesoGuard]},
        {path: 'facturas', component: FacturaComponent, canActivate: [accesoGuard]},
        {path: 'compra', component: CompraComponent, canActivate: [accesoGuard]},
        {path: 'venta', component: VentaComponent, canActivate: [accesoGuard]},
      ], canActivate: [accesoGuard]}
  ]},
  {path: '**', component: LoginComponent},
  {path: '', component: LoginComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
