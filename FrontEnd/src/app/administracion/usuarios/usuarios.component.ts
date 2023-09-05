import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BreadcrumbService } from 'src/app/layout/app.breadcrumb.service';
import { usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [MessageService]
})
export class UsuariosComponent{

  usuarios: any[]

  constructor(private breadcrumbService: BreadcrumbService, private usuarioService: UsuarioService, private messageService: MessageService) {
    this.breadcrumbService.setItems([
      {label: 'Administración'},
      {label: 'Usuarios'}
  ]);

    this.actualizarUsuarios()
  }

  eliminarUsuario(Usuario: usuario){
    this.usuarioService.eliminarUsuario(Usuario).subscribe((result) => {
      if(result == 1){
        this.actualizarUsuarios()
        this.messageService.add({ severity: 'success', summary: 'Éxito...!', detail: `${Usuario.nombres} ha sido eliminado con éxito` });
      }
    })
  }

  actualizarUsuarios(){
    this.usuarioService.consultarUsuarios().subscribe((usuarios: any) => {
      this.usuarios = usuarios
    })
  }

  
}