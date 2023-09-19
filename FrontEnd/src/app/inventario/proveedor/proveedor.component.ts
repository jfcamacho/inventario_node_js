import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { direccion } from 'src/app/models/direccion.model';
import { estado } from 'src/app/models/estado.model';
import { pago } from 'src/app/models/pago.model';
import { proveedor } from 'src/app/models/proveedor.model';
import { DireccionService } from 'src/app/services/direccion.service';
import { EstadoService } from 'src/app/services/estado.service';
import { PagoService } from 'src/app/services/pago.service';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss'],
  styles: [`
      @media screen and (max-width: 960px) {
          :host ::ng-deep .fc-header-toolbar {
              display: flex;
              flex-wrap: wrap;
          }
      }
  `],
  providers: [MessageService]
})
export class ProveedorComponent {
  proveedores: proveedor[]
  proveedor: proveedor = new proveedor
  estados: estado[]
  direcciones: direccion[]
  pagos: pago[]
  messages: Message[] | undefined;
  showDirections: boolean = false
  editDirection: boolean = false
  direccion = new direccion
  title: string

  constructor(  private proveedorService: ProveedorService, 
                private estadoService: EstadoService,
                private direccionService: DireccionService,
                private pagoService: PagoService,
                private route: ActivatedRoute,
                private messageService: MessageService)
  {
    this.messages = [{ severity: 'warn', summary: 'Advertencia.:', detail: 'Se debe crear el proveedor para permitir ingresar las direcciones' }];

    this.estadoService.consultarEstados().subscribe((estados: any) => {
      this.estados = estados
    })
    this.pagoService.consultarPagos().subscribe((pagos: any) => {
      this.pagos = pagos
    })
    this.proveedor.id = this.route.snapshot.params['idProveedor'] || 0
    if(this.proveedor.id != 0){
      this.proveedorService.consultarProveedor(this.proveedor).subscribe((proveedor: any) => {
        this.proveedor = proveedor
        this.actualizarDirecciones()
      })
    }
  }

  actualizarDirecciones(){
    this.direccionService.consultarDirecciones(this.proveedor.id).subscribe((direcciones: any) => {
      this.direcciones =  direcciones
    })
  }

  registrarProveedor(){

    this.proveedorService.crearProveedor(this.proveedor).subscribe( (resultado: any) => {
      if(resultado.Proveedor){
        this.proveedor = resultado.Proveedor
        this.messageService.add({ severity: 'success', summary: 'Éxito...!', detail: `${resultado.Proveedor.razon_social} ha sido registrado con éxito` });
      }else if (resultado == 1){
        this.messageService.add({ severity: 'success', summary: 'Éxito...!', detail: `${this.proveedor.razon_social} ha sido actualizado con éxito` });
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Error...!', detail: resultado.Error });
      }
    }), error => {
      this.messageService.add({ severity: 'error', summary: 'Error...!', detail: error });
    }
  }

  crearDireccion(){
    this.editDirection = true
    this.title = "Crear nueva dirección"
  }

  almacenarDireccion(){
    this.direccion.idUsuario = this.proveedor.id
    console.log(this.direccion);
    this.direccionService.crearDireccion(this.direccion).subscribe((result: any) => {
      this.actualizarDirecciones()
      this.messageService.add({ severity: 'success', summary: 'Éxito...!', detail: `La dirección para el proveedor ${this.proveedor.razon_social} ha sido registrada con éxito` });
    })
  }

  mostrarDirecciones(){
    this.showDirections = true
  }

  editarDireccion(direccion: direccion){
    this.direccion = direccion
    this.editDirection = true
    this.title = "Editar dirección"
  }

  eliminarDireccion(direccion: direccion){
    this.direccionService.eliminarDireccion(direccion).subscribe(() => {
      this.actualizarDirecciones()
      this.editDirection = false
      this.messageService.add({ severity: 'success', summary: 'Éxito...!', detail: `La dirección para el proveedor ${this.proveedor.razon_social} ha sido eliminada con éxito` });
    })
  }

}
