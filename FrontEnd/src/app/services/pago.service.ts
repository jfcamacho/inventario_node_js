import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { pago } from '../models/pago.model';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  url = environment.apiUrl

  constructor(private http: HttpClient) { }

  consultarPagos(){
    return this.http.get(`${this.url}/pago`)
  }

  crearPago(pago: pago){
    if(pago.id > 0){
      return this.http.put(`${this.url}/pago/${pago.id}`, pago)
    }else{
      return this.http.post(`${this.url}/pago`, pago)
    }
  }

  eliminarPago(pago: pago){
    return this.http.delete(`${this.url}/pago/${pago.id}`)
  }
}
