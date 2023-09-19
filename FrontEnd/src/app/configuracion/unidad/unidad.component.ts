import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { unidad } from 'src/app/models/unidad.model';
import { estado } from 'src/app/models/estado.model';
import { UnidadService } from 'src/app/services/unidad.service';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.scss'],
  providers: [MessageService]
})
export class UnidadComponent {
  unidads: unidad[]
  unidad: unidad = new unidad
  estados: estado[]
  editCategory: boolean = false
  showCategory: boolean = false
  selectedEstado: estado
  title: string = ""

  constructor(private unidadService: UnidadService, private estadoService: EstadoService, private messageService: MessageService){
    this.actualizarUnidads()

    this.estadoService.consultarEstados().subscribe((estados: any) => {
      this.estados = estados
    })
  }

  actualizarUnidads(){
    this.unidadService.consultarUnidades().subscribe((unidads: any) => {
      this.unidads = unidads
    })
  }

  mostrarUnidad(unidad: unidad){
    this.title = `Administración de unidad ${unidad.abreviatura.toLowerCase()}`
    this.showCategory = true
    this.unidad = unidad
    this.selectedEstado = unidad.Estado
  }

  modificarUnidad(unidad: unidad){
    this.title = `Administración de unidad ${unidad.abreviatura.toLowerCase()}`
    this.editCategory = true
    this.unidad = unidad
    this.selectedEstado = unidad.Estado
  }

  crearUnidad(){
    this.title = `Nueva unidad`
    this.editCategory = true
    this.unidad = new unidad
    this.selectedEstado = new estado
  }

  eliminarUnidad(unidad: unidad){
    this.unidadService.eliminarUnidad(unidad).subscribe(result => {
      if(result){
        this.actualizarUnidads()
        this.messageService.add({ severity: 'success', summary: 'Éxito...!', detail: `La unidad ${unidad.abreviatura} ha sido eliminada con éxito` });
      }
    })
  }

  almacenar(){
    this.unidad.idEstado = this.selectedEstado.id
    this.unidadService.crearUnidad(this.unidad).subscribe((result) => {
      if(result){
        this.actualizarUnidads()
        this.messageService.add({ severity: 'success', summary: 'Éxito...!', detail: `La unidad ${this.unidad.abreviatura} ha sido actualizada con éxito` });
      }
    }, error => {
      this.messageService.add({ severity: 'danger', summary: 'Error...!', detail: `La unidad ${this.unidad.abreviatura}  no ha sido actualizada` });
    })
  }
}
