import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { factura } from '../models/factura.model';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  url = environment.apiUrl

  constructor(private http: HttpClient) { }

  consultarFacturas(idEstado: number){
    return this.http.get(`${this.url}/factura/${idEstado}`)
  }

  crearFactura(factura: factura){
    if(factura.id > 0){
      return this.http.put(`${this.url}/factura/${factura.id}`, factura)
    }else{
      return this.http.post(`${this.url}/factura`,factura)
    }
  }

  eliminarFactura(factura: factura){
    return this.http.delete(`${this.url}/factura/${factura.id}`)
  }
}
