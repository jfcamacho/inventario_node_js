import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { direccion } from '../models/direccion.model';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {
  url = environment.apiUrl

  constructor(private http: HttpClient) { }

  consultarDirecciones(idUsuario: number){
    return this.http.get(`${this.url}/direccion/${idUsuario}`)
  }

  crearDireccion(direccion: direccion){
    if(direccion.id > 0){
      return this.http.put(`${this.url}/direccion/${direccion.id}`, direccion)
    }else{
      return this.http.post(`${this.url}/direccion`, direccion)
    }
    
  }

  consultarDireccion(direccion: direccion){
    return this.http.get(`${this.url}/direccion/${direccion.id}`)
  }

  eliminarDireccion(direccion: direccion){
    return this.http.delete(`${this.url}/direccion/${direccion.id}`)
  }
}
