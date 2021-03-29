import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

export class CitasService {
  url:string = 'http://127.0.0.1:8000/api/apolonia/';
  constructor(private http:HttpClient, private auth:AuthService){}
  
  getDispo(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
    });
    return this.http.get(this.url+'dispoHorario',{headers})

  }
  agendarCita(id:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
    });
    const data = ({
      'disponibilidad': id.toString(),
      'id_paciente': this.auth.usuario.id.toString(),
    });
    return this.http.post(this.url+'agendaCita', data, {headers});
  }

  getHistorial(id:String){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
    });
    const data=({
      'id_paciente': id
    });
    return this.http.post(this.url+'historial',data,{headers});
  }

}
