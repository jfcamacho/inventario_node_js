import { Component } from '@angular/core';
import { BreadcrumbService } from '../layout/app.breadcrumb.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([
        {label: 'Pages'},
        {label: 'Empty Page'}
    ]);
  }
}
