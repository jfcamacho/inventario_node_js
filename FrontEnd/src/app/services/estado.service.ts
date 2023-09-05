import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  url = environment.apiUrl

  constructor(private http: HttpClient) { }

  consultarEstados(){
    return this.http.get(`${this.url}/estado`)
  }
}
