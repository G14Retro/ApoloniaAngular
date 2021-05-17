import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { odontoModel } from '../models/odontograma.model';
import { userModel } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  fichaDental:String;
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
    return this.http.post(this.url+'guardarAntecedente',datos,{headers});
  }

  getPacientes(){
    const  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + this.auth.usuario.token
    });
    return this.http.get(this.url + 'verPacientes',{headers});
  }

  getPacienteID(id:string){
    const  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + this.auth.usuario.token
    });
    return this.http.get(this.url + 'pacienID/'+id,{headers});
  }

  getOdontos(id:string){
    const  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + this.auth.usuario.token
    });
    return this.http.get(this.url+'verOdonto/'+id,{headers});
  }

  guardarOdonto(odonto:odontoModel){
    const  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + this.auth.usuario.token
    });
    const data = ({
      ...odonto
    })
    return this.http.post(this.url+'guardarOdonto',data,{headers});
  }
  nuevaFicha(id:String){
    const  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + this.auth.usuario.token
    });
    const data = ({
      id: id
    })
    return this.http.post(this.url+'nuevaFicha',data,{headers});
  }
  getOdonto(id:String){
    const  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + this.auth.usuario.token
    });
    return this.http.get(this.url+'obtenerOdonto/'+id,{headers});
  }

  getAntecedenteId(id:String){
    const  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + this.auth.usuario.token
    });
    return this.http.get(this.url+'verAntecedenteID/'+id,{headers});
  }
  guardarAtecedenteId(datos:FormGroup){
    const  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + this.auth.usuario.token
    });
    const data = ({
      ...datos.value
    });
    return this.http.post(this.url+'guardarAntecedenteId',data,{headers});
  }
}
