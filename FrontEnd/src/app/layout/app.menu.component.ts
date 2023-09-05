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
            }
        ];
    }
}
