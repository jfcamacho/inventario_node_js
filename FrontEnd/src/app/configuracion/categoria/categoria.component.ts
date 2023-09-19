import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { categoria } from 'src/app/models/categoria.model';
import { estado } from 'src/app/models/estado.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
  providers: [MessageService]
})
export class CategoriaComponent {
  categorias: categoria[]
  categoria: categoria = new categoria
  estados: estado[]
  editCategory: boolean = false
  showCategory: boolean = false
  selectedEstado: estado
  title: string = ""

  constructor(private categoriaService: CategoriaService, private estadoService: EstadoService, private messageService: MessageService){
    this.actualizarCategorias()

    this.estadoService.consultarEstados().subscribe((estados: any) => {
      this.estados = estados
    })
  }

  actualizarCategorias(){
    this.categoriaService.consultarCategorias().subscribe((categorias: any) => {
      this.categorias = categorias
    })
  }

  mostrarCategoria(categoria: categoria){
    this.title = `Administración de categoria ${categoria.nombre.toLowerCase()}`
    this.showCategory = true
    this.categoria = categoria
    this.selectedEstado = categoria.Estado
  }

  modificarCategoria(categoria: categoria){
    this.title = `Administración de categoria ${categoria.nombre.toLowerCase()}`
    this.editCategory = true
    this.categoria = categoria
    this.selectedEstado = categoria.Estado
  }

  crearCategoria(){
    this.title = `Nueva categoria`
    this.editCategory = true
    this.categoria = new categoria
    this.selectedEstado = new estado
  }

  eliminarCategoria(categoria: categoria){
    this.categoriaService.eliminarCategoria(categoria).subscribe(result => {
      if(result){
        this.actualizarCategorias()
        this.messageService.add({ severity: 'success', summary: 'Éxito...!', detail: `La categoria ${categoria.nombre} ha sido eliminada con éxito` });
      }
    })
  }

  almacenar(){
    this.categoria.idEstado = this.selectedEstado.id
    this.categoriaService.crearCategoria(this.categoria).subscribe((result) => {
      if(result){
        this.actualizarCategorias()
        this.messageService.add({ severity: 'success', summary: 'Éxito...!', detail: `La categoria ${this.categoria.nombre} ha sido actualizada con éxito` });
      }
    }, error => {
      this.messageService.add({ severity: 'danger', summary: 'Error...!', detail: `La categoria ${this.categoria.nombre}  no ha sido actualizada` });
    })
  }

}
