import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  url = environment.apiUrl

  constructor(private http: HttpClient) { }

  consultarCategoria(){
    return this.http.get(`${this.url}/pago`)
  }
}
