import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { odontoModel } from '../models/odontograma.model';
import { userModel } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  odonto:String;
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


  asistencia(id:string){
    const  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + this.auth.usuario.token
    });
    return this.http.put(this.url + 'asistencia/'+id,'',{headers});
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

  cargarOdonto(id:String){
    const  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + this.auth.usuario.token
    });
    return this.http.get(this.url+'cargarOdonto/'+id,{headers});
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

  getDientes(){
    const  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + this.auth.usuario.token
    });
    return this.http.get(this.url+'getDientes',{headers});
  }

  getSintomas(){
    const  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + this.auth.usuario.token
    });
    return this.http.get(this.url+'getSintomas',{headers});
  }

  getTratamientos(){
    const  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + this.auth.usuario.token
    });
    return this.http.get(this.url+'getTratamientos',{headers});
  }
  guardarDiagnostico(datos:FormGroup){
    const  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + this.auth.usuario.token
    });
    const data = ({
      ...datos
    });
    return this.http.post(this.url+'guardarDiagnostico',data,{headers});
  }

  getDiente(odonto:String,diente:string){
    const  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + this.auth.usuario.token
    });
    const data = ({
      odontograma: odonto,
      diente: diente
    });
    return this.http.post(this.url+'getDiente',data,{headers});
  }

  getPacienteByOdonto(id:String){
    const  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + this.auth.usuario.token
    });
    return this.http.get(this.url + 'getPacienteByOdonto/'+id,{headers});
  }

  getDiagnosticos(id:string){
    const  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + this.auth.usuario.token
    });
    return this.http.get(this.url + 'getDiagnosticos/'+id,{headers});
  }

  nuevoDiagnostico(id_paciente:string){
    const  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + this.auth.usuario.token
    });
    const data = ({
      id: id_paciente
    });

    return this.http.post(this.url+'nuevoDiagnostico',data,{headers});
  }


  getDiagnosticoId(id:string){
    const  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + this.auth.usuario.token
    });
    return this.http.get(this.url+'diagnosticoId/'+id,{headers});
  }


  editDiagnostico(diagnostico:FormArray){
    const  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + this.auth.usuario.token
    });
    const data = ({
      ...diagnostico.value
    })
    return this.http.post(this.url+'editDiagnostico',data,{headers});
  }

  doctorDash(){
    const  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer ' + this.auth.usuario.token
    });
    return this.http.get(this.url+'doctorDash/'+this.auth.usuario.id,{headers});
  }

}
