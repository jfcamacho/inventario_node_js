import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.apiUrl

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  autenticar(data: any){

    return new Promise((resolve, reject) => {
      this.http.post(`${this.url}/auth`, data).subscribe( result => {
        resolve(result)
      }, error => {
        reject(error)
      })
    })
  }

  renovarToken(){
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/auth/renovarToken`).subscribe((result) => {
        if(result['Token'] != ""){
          // console.log('Last Token ' + this.cookieService.get('invToken'));
          this.cookieService.set('invToken', result['Token'], null, '/', null, true, 'Lax');
          // console.log('New Token ' + this.cookieService.get('invToken'));
          resolve(true)
        }else{
          // console.log('Token Expirado');
          resolve(false)
        }
      })
    })

    
  }
}
