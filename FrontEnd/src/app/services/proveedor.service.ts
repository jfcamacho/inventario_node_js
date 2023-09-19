import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { proveedor } from '../models/proveedor.model';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  url = environment.apiUrl

  constructor(private http: HttpClient) { }

  consultarProveedores(){
    return this.http.get(`${this.url}/proveedor`)
  }

  crearProveedor(proveedor: proveedor){
    if(proveedor.id > 0){
      return this.http.put(`${this.url}/proveedor/${proveedor.id}`, proveedor)
    }else{
      return this.http.post(`${this.url}/proveedor`, proveedor)
    }
    
  }

  consultarProveedor(proveedor: proveedor){
    return this.http.get(`${this.url}/proveedor/${proveedor.id}`)
  }

  eliminarProveedor(proveedor: proveedor){
    return this.http.delete(`${this.url}/proveedor/${proveedor.id}`)
  }
}
