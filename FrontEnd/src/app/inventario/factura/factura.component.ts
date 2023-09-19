import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { factura } from 'src/app/models/factura.model';
import { FacturaService } from 'src/app/services/factura.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss'],
  providers: [MessageService]
})
export class FacturaComponent {

  items: MenuItem[];
  facturas: factura[]
  title: string

  constructor(
    private messgaeService: MessageService,
    private facturaService: FacturaService
  ){
    this.items = [{
      label: 'Facturas',
      items: [
          {label: 'Emitidas', icon: 'pi pi-plus', command: () => this.actualizarEmitidas()},
          {label: 'Recibidas', icon: 'pi pi-download', command: () => this.actualizarRecibidas()},
      ]
    }];
    this.actualizarEmitidas()
  }

  actualizarEmitidas(){
    this.title = "Emitidas"
    this.facturaService.consultarFacturas(4).subscribe((result: any) => {
      this.facturas = result
    })
  }

  actualizarRecibidas(){
    this.title = "Recibidas"
    this.facturaService.consultarFacturas(5).subscribe((result: any) => {
      this.facturas = result
    })
  }

  eliminarFactura(factura: factura){
    this.facturaService.eliminarFactura(factura).subscribe((result) => {
      if(result){
        this.title == "Recibidas" ? this.actualizarRecibidas() : this.actualizarEmitidas
        this.messgaeService.add({severity: 'success', summary: 'Éxito', detail: `La factura R${factura.num_factura} ha sido correctamente eliminada`})
      }
    })
  }
}
