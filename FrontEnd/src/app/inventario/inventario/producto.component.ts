import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BreadcrumbService } from 'src/app/layout/app.breadcrumb.service';
import { categoria } from 'src/app/models/categoria.model';
import { estado } from 'src/app/models/estado.model';
import { inventario } from 'src/app/models/inventario.model';
import { unidad } from 'src/app/models/unidad.model';
import { AsocProdProvService } from 'src/app/services/asoc-prod-prov.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { EstadoService } from 'src/app/services/estado.service';
import { InventarioService } from 'src/app/services/inventario.service';
import { UnidadService } from 'src/app/services/unidad.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  providers: [MessageService]
})
export class ProductoComponent {
  Unidades: unidad[]
  Estados: estado[]
  Categorias: categoria[]
  producto: inventario = new inventario

  constructor(
      private messageService: MessageService, 
      private inventarioService: InventarioService,
      private unidadService: UnidadService,
      private categoriaService: CategoriaService,
      private estadoService: EstadoService,
      private breadCrumbService: BreadcrumbService,
      private route: ActivatedRoute){

        this.producto.id = this.route.snapshot.params['idProducto'] || 0

        this.breadCrumbService.setItems([
          {label: 'Administración'},
          {label: 'Productos', routerLink: ['/SOFT/inventario/productos']},
          {label: 'Producto', routerLink: ['/SOFT/inventario/producto/', this.producto.id]},
        ])

        this.unidadService.consultarUnidades().subscribe( (unidades: any) => {
          this.Unidades = unidades
        })
        this.categoriaService.consultarCategorias().subscribe( (categorias: any) => {
          this.Categorias = categorias
        })
        this.estadoService.consultarEstados().subscribe( (estados: any) => {
          this.Estados = estados
        })


        if(this.producto.id > 0){
          this.inventarioService.consultarProducto(this.producto).subscribe( producto => {
            this.producto = producto
          })
        }else{
          this.producto.pr_compra = 0
          this.producto.pr_venta = 0
        }

      }
  
  almacenarProducto(){
    this.inventarioService.crearProductos(this.producto).subscribe((producto: inventario) => {
      this.messageService.add({severity: 'success', summary: 'Éxito...!', detail: `El producto ${producto.nombre} ha sido registrado con éxito`})
    })
  }


  images: any[] = [
    {
        previewImageSrc: 'assets/layout/images/Recurso1.png',
        thumbnailImageSrc: 'assets/layout/images/Recurso1.png',
        title: 'Recurso 1'
    },
    {
        previewImageSrc: 'assets/layout/images/Recurso2.png',
        thumbnailImageSrc: 'assets/layout/images/Recurso2.png',
        title: 'Recurso 2'
    },
    {
        previewImageSrc: 'assets/layout/images/Recurso3.png',
        thumbnailImageSrc: 'assets/layout/images/Recurso3.png',
        title: 'Recurso 3'
    },
    {
        previewImageSrc: 'assets/layout/images/Recurso4.png',
        thumbnailImageSrc: 'assets/layout/images/Recurso4.png',
        title: 'Recurso 4'
    },
];

}
