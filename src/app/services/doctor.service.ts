import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': 'Bearer ' + this.auth.usuario.token
  });
  const dato = ({
      'id_medico':this.auth.usuario.id.toString()
  });
  return this.http.post(this.url+'pacienteMedico',dato,{headers});
  }

  obtenerAntecedente(id:String){
    const  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + this.auth.usuario.token
    });
    const dato = ({
      'id_paciente':id.toString()
  });
  return this.http.post(this.url+'verAntecedentes',dato,{headers});
  }

  guardarAntecedente(data:FormGroup){
    const  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + this.auth.usuario.token
    });

    const datos =({
    ...data.value
    });
    console.log(datos);
    return this.http.post(this.url+'guardarAntecedente',datos,{headers})
  }
}
