import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { unidad } from '../models/unidad.model';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {

  url = environment.apiUrl

  constructor(private http: HttpClient) { }

  consultarUnidades(){
    return this.http.get(`${this.url}/unidad`)
  }

  crearUnidad(unidad: unidad){
    if(unidad.id > 0){
      return this.http.put(`${this.url}/unidad/${unidad.id}`, unidad)
    }else{
      return this.http.post(`${this.url}/unidad`, unidad)
    }
  }

  eliminarUnidad(unidad: unidad){
    return this.http.delete(`${this.url}/unidad/${unidad.id}`)
  }
}
