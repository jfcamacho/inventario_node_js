import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../layout/app.breadcrumb.service';
import { ActivatedRoute } from '@angular/router';
import { usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { estado } from 'src/app/models/estado.model';
import { EstadoService } from 'src/app/services/estado.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-crudusuarios',
  templateUrl: './crudusuarios.component.html',
  styleUrls: ['./crudusuarios.component.scss'],
  providers: [MessageService]
})
export class CRUDusuariosComponent{

  //Definición de variables
  usuarios: usuario[]
  usuario: usuario = new usuario
  estados: estado[]
  selectedEstado: estado

  constructor(  private breadcrumbService: BreadcrumbService, 
                private activatedRoute: ActivatedRoute, 
                private usuarioService: UsuarioService, 
                private estadoService: EstadoService,
                private messageService: MessageService) {
    this.usuario.id = this.activatedRoute.snapshot.params["idUsuario"] || 0
    this.breadcrumbService.setItems([
        {label: 'Administración'},
        {label: 'Usuario'}
    ]);

    this.estadoService.consultarEstados().subscribe( (estados: estado[]) => {
      this.estados = estados
    })

    if(this.usuario.id == 0){
      console.log("No se ha definido usuario");
    }else{
      this.usuarioService.consultarUsuario(this.usuario.id).subscribe( (usuario: any) => {
        this.usuario = usuario
        this.selectedEstado = usuario.Estado
      })
    }

  }

  registrarUsuario(){
    this.usuario.idEstado = this.selectedEstado.id
    this.usuarioService.registrarUsuario(this.usuario).subscribe( (resultado: any) => {
      if(resultado.Usuario){
        this.messageService.add({ severity: 'success', summary: 'Éxito...!', detail: `${resultado.Usuario.nombres} ha sido registrado con éxito` });
      }else if (resultado == 1){
        this.messageService.add({ severity: 'success', summary: 'Éxito...!', detail: `${this.usuario.nombres} ha sido actualizado con éxito` });
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Error...!', detail: resultado.Error });
      }
    }), error => {
      this.messageService.add({ severity: 'error', summary: 'Error...!', detail: error });
    }
  }
}
