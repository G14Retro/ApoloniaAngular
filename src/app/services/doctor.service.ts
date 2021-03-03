import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userModel } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  usuario:userModel;
  url:string = 'http://localhost:8000/api/apolonia/';
  constructor(private http:HttpClient, private auth:AuthService) { }


  obtenerAgenda(){
   const  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': 'Bearer ' + this.auth.usuario.token
   });
   const dato = ({
      'id_medico':this.auth.usuario.id.toString()
   });
   return this.http.post(this.url+'pacienteMedico',dato,{headers});
  }
}
