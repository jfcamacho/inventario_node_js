import {Component, OnInit} from '@angular/core';
import {AppMainComponent} from './app.main.component';

@Component({
    selector: 'app-menu',
    template: `
		<ul class="layout-menu">
			<li app-menuitem *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true"></li>
		</ul>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public app: AppMainComponent) {}

    ngOnInit() {
        this.model = [
            {label: 'Home', icon: 'home', routerLink: ['/SOFT/home']},
            {
                label: 'Administración', icon: 'jedi', routerLink: ['/SOFT/administracion'], badgeStyleClass: 'text-badge', badge: 'New',
                items: [
                    {label: 'Usuarios', icon: 'users-gear', routerLink: ['/SOFT/administracion/usuarios']},
                    {label: 'Usuario', icon: 'users-gear', routerLink: ['/SOFT/administracion/usuario']}
                ]
            },
            {
                label: 'Configuración', icon: 'screwdriver-wrench', routerLink: ['/SOFT/configuracion'], badgeStyleClass: 'text-badge', badge: 'New',
                items: [
                    {label: 'Categoría', icon: 'swatchbook', routerLink: ['/SOFT/configuracion/categoria']},
                    {label: 'Unidad', icon: 'infinity', routerLink: ['/SOFT/configuracion/unidad']},
                    {label: 'Pago', icon: 'money-bill-wheat', routerLink: ['/SOFT/configuracion/pago']}
                ]
            },
            {
                label: 'Inventario', icon: 'chart-pie', routerLink: ['/SOFT/inventario'], badgeStyleClass: 'text-badge', badge: 'New',
                items: [
                    {label: 'Productos', icon: 'gifts', routerLink: ['/SOFT/inventario/productos']},
                    {label: 'Proveedores', icon: 'people-roof', routerLink: ['/SOFT/inventario/proveedores']},
                    {label: 'Facturas', icon: 'file-invoice-dollar', routerLink: ['/SOFT/inventario/facturas']},
                    {label: 'Compra', icon: 'cart-shopping', routerLink: ['/SOFT/inventario/compra']},
                    {label: 'Venta', icon: 'cash-register', routerLink: ['/SOFT/inventario/venta']}
                ]
            }
        ];
    }
}
