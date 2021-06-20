import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  constructor(private http:HttpClient, private auth:AuthService) { 
  }
  
  pacienteDash(){
    const headers = this.auth.headers;
    return this.http.get(environment.apiEndpoint+'pacienteDash/'+this.auth.usuario.id,{headers})
  }
}
