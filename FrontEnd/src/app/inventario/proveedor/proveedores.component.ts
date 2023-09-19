import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BreadcrumbService } from 'src/app/layout/app.breadcrumb.service';
import { proveedor } from 'src/app/models/proveedor.model';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss'],
  providers: [MessageService]
})
export class ProveedoresComponent {

  proveedores: any[]

  constructor(private breadcrumbService: BreadcrumbService, private proveedorService: ProveedorService, private messageService: MessageService) {
    this.breadcrumbService.setItems([
      {label: 'Administración'},
      {label: 'Proveedores', routerLink: ['/SOFT/inventario/proveedores']},
  ]);

    this.actualizarProveedores()
  }

  eliminarProveedor(proveedor: proveedor){
    this.proveedorService.eliminarProveedor(proveedor).subscribe((result) => {
      if(result == 1){
        this.actualizarProveedores()
        this.messageService.add({ severity: 'success', summary: 'Éxito...!', detail: `${proveedor.razon_social} ha sido eliminado con éxito` });
      }
    })
  }

  actualizarProveedores(){
    this.proveedorService.consultarProveedores().subscribe((proveedores: any) => {
      this.proveedores = proveedores
    })
  }
}
