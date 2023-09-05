import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = environment.apiUrl

  constructor( private http: HttpClient) { }

  consultarUsuarios(){
    return this.http.get(`${this.url}/usuario`)
  }

  consultarUsuario(idUsuario){
    return this.http.get(`${this.url}/usuario/${idUsuario}`)
  }

  registrarUsuario(usuario: usuario){
    if(usuario.id > 0){
      return this.http.put(`${this.url}/usuario/${usuario.id}`, usuario)
    }else{
      return this.http.post(`${this.url}/usuario`, usuario)
    }
  }

  eliminarUsuario(usuario: usuario){
    return this.http.delete(`${this.url}/usuario/${usuario.id}`)
  }

}
