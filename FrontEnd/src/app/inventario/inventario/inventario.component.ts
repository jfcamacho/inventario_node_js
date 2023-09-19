import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BreadcrumbService } from 'src/app/layout/app.breadcrumb.service';
import { asocProdProv } from 'src/app/models/asocProdProv.model';
import { inventario } from 'src/app/models/inventario.model';
import { proveedor } from 'src/app/models/proveedor.model';
import { AsocProdProvService } from 'src/app/services/asoc-prod-prov.service';
import { InventarioService } from 'src/app/services/inventario.service';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss'],
  providers: [MessageService]
})
export class InventarioComponent {

  productos: inventario[]
  listProveedores: proveedor[]
  producto: inventario = new inventario
  showProveedores: boolean = false
  proveedores: asocProdProv[]
  editProveedor: boolean = false
  asociacion: asocProdProv = new asocProdProv

  constructor(  private messageService: MessageService, 
                private proveedorService: ProveedorService,
                private inventarioService: InventarioService, 
                private asocProdProvService: AsocProdProvService,
                private breadcrumbService: BreadcrumbService){
    this.breadcrumbService.setItems([
      {label: 'Administración'},
      {label: 'Productos', routerLink: ['/SOFT/inventario/productos']}
    ]);
    this.actualizarProductos();
  }

  actualizarProductos(){
    this.inventarioService.consultarProductos().subscribe((productos: any) => {
      this.productos = productos
    })
  }

  eliminarProducto(producto: inventario){
    this.inventarioService.eliminarProductos(producto).subscribe( result => {
      if(result){
        this.actualizarProductos()
        this.messageService.add({ severity: 'success', summary: 'Éxito...!', detail: `El producto ${producto.nombre} ha sido eliminado con éxito` });
      }
    })
  }

  mostrarProveedores(producto: inventario){
    this.producto = producto
    this.showProveedores = true
    this.actualizarProveedores()
  }

  asociarProveedor(){
    this.asociacion.idProducto = this.producto.id
    this.asociacion.idEstado = 1
    this.proveedorService.consultarProveedores().subscribe( (proveedores: any) => {
      this.listProveedores = proveedores.filter(result => {
        return !this.proveedores.find(prov => prov.idProveedor == result.id)
      })
      this.editProveedor = true
    })
  }

  actualizarProveedores(){
    this.asocProdProvService.consultarProveedoresPorProducto(this.producto).subscribe((result: any) => {
      this.proveedores = result
    })
  }

  eliminarProveedor(asociacion: asocProdProv){
    this.asocProdProvService.eliminarProductos(asociacion).subscribe( result => {
      this.actualizarProveedores()
      this.actualizarProductos()
      this.messageService.add({ severity: 'success', summary: 'Éxito...!', detail: `El proveedor ${asociacion.Proveedor.razon_social} ha sido eliminado con éxito` });
    })
  }

  almacenarAsociacion(){
    this.asocProdProvService.crearProductos(this.asociacion).subscribe((result) => {
      this.actualizarProveedores()
      this.actualizarProductos()
      this.messageService.add({ severity: 'success', summary: 'Éxito...!', detail: `El proveedor ha sido asociado con éxito` });
    })
  }

}
