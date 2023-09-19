import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  url = environment.apiUrl

  constructor(private http: HttpClient) { }

  consultarCategorias(){
    return this.http.get(`${this.url}/categoria`)
  }

  crearCategoria(categoria: categoria){
    if(categoria.id > 0){
      return this.http.put(`${this.url}/categoria/${categoria.id}`, categoria)
    }else{
      return this.http.post(`${this.url}/categoria`, categoria)
    }
  }

  eliminarCategoria(categoria: categoria){
    return this.http.delete(`${this.url}/categoria/${categoria.id}`)
  }
}
