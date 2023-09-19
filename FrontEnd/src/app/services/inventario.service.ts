import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { inventario } from '../models/inventario.model';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  url = environment.apiUrl

  constructor(private http: HttpClient) { }

  consultarProductos(){
    return this.http.get(`${this.url}/inventario`)
  }

  consultarProducto(producto: inventario){
    return this.http.get(`${this.url}/inventario/${producto.id}`)
  }

  crearProductos(inventario: inventario){
    if(inventario.id > 0 ){
      return this.http.put(`${this.url}/inventario/${inventario.id}`, inventario)
    }else{
      return this.http.post(`${this.url}/inventario`, inventario)
    }
  }

  eliminarProductos(inventario: inventario){
    return this.http.delete(`${this.url}/inventario/${inventario.id}`)
  }
}
