import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { asocProdProv } from '../models/asocProdProv.model';
import { proveedor } from '../models/proveedor.model';
import { inventario } from '../models/inventario.model';

@Injectable({
  providedIn: 'root'
})
export class AsocProdProvService {

  url = environment.apiUrl

  constructor(private http: HttpClient) { }

  consultarProductos(){
    return this.http.get(`${this.url}/asocprodprov`)
  }

  consultarProductosPorProveedor(proveedor: proveedor){
    return this.http.get(`${this.url}/asocprodprov/prodprov/${proveedor.id}`)
  }

  consultarProveedoresPorProducto(inventario: inventario){
    return this.http.get(`${this.url}/asocprodprov/provprod/${inventario.id}`)
  }

  crearProductos(asocprodprov: asocProdProv){
    if(asocprodprov.id > 0 ){
      return this.http.put(`${this.url}/asocprodprov/${asocprodprov.id}`, asocprodprov)
    }else{
      return this.http.post(`${this.url}/asocprodprov`, asocprodprov)
    }
  }

  eliminarProductos(asocprodprov: asocProdProv){
    return this.http.delete(`${this.url}/asocprodprov/${asocprodprov.id}`)
  }
}
