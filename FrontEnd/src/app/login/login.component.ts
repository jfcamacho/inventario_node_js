import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { usuario } from '../models/usuario.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  usuario: usuario

  constructor(private authService: AuthService, private router: Router, private http: HttpClient, private cookieService: CookieService){
    this.usuario = new Object
    this.usuario.correo = "jefferson-camacho@hotmail.com"
  }


  autenticar(){
    this.authService.autenticar(this.usuario)
    .then((result) => {
      if(result){
        const token = result['Token']
        this.cookieService.set('invToken', token, null, '/', null, true, 'Lax');
        this.router.navigate(['/SOFT/home'])
      }
    }).catch((err) => {
      
    });
  }

}
