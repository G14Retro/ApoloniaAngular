import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecepcionistaService {

  constructor(private http:HttpClient, private auth:AuthService) {}

  public listarDispo(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
    });
    
    return this.http.get(environment.apiEndpoint+'verDispo',{headers});
    
  }
}

