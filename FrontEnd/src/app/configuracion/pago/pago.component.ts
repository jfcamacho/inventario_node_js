import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { pago } from 'src/app/models/pago.model';
import { estado } from 'src/app/models/estado.model';
import { PagoService } from 'src/app/services/pago.service';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss'],
  providers: [MessageService]
})
export class PagoComponent {
  pagos: pago[]
  pago: pago = new pago
  estados: estado[]
  editCategory: boolean = false
  showCategory: boolean = false
  selectedEstado: estado
  title: string = ""

  constructor(private pagoService: PagoService, private estadoService: EstadoService, private messageService: MessageService){
    this.actualizarPagos()

    this.estadoService.consultarEstados().subscribe((estados: any) => {
      this.estados = estados
    })
  }

  actualizarPagos(){
    this.pagoService.consultarPagos().subscribe((pagos: any) => {
      this.pagos = pagos
    })
  }

  mostrarPago(pago: pago){
    this.title = `Administración de pago ${pago.nombre.toLowerCase()}`
    this.showCategory = true
    this.pago = pago
    this.selectedEstado = pago.Estado
  }

  modificarPago(pago: pago){
    this.title = `Administración de pago ${pago.nombre.toLowerCase()}`
    this.editCategory = true
    this.pago = pago
    this.selectedEstado = pago.Estado
  }

  crearPago(){
    this.title = `Nuevo pago`
    this.editCategory = true
    this.pago = new pago
    this.selectedEstado = new estado
  }

  eliminarPago(pago: pago){
    this.pagoService.eliminarPago(pago).subscribe(result => {
      if(result){
        this.actualizarPagos()
        this.messageService.add({ severity: 'success', summary: 'Éxito...!', detail: `La pago ${pago.nombre} ha sido eliminada con éxito` });
      }
    })
  }

  almacenar(){
    this.pago.idEstado = this.selectedEstado.id
    this.pagoService.crearPago(this.pago).subscribe((result) => {
      if(result){
        this.actualizarPagos()
        this.messageService.add({ severity: 'success', summary: 'Éxito...!', detail: `La pago ${this.pago.nombre} ha sido actualizada con éxito` });
      }
    }, error => {
      this.messageService.add({ severity: 'danger', summary: 'Error...!', detail: `La pago ${this.pago.nombre}  no ha sido actualizada` });
    })
  }
}
