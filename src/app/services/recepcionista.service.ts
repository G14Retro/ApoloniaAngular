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

  public listarMedicos(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
    });
    return this.http.get(environment.apiEndpoint+'verMedicos',{headers});
  }

  public listarConsultorios(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
    });
    return this.http.get(environment.apiEndpoint+'verConsultorios',{headers});
  }

  public listarConsultas(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
    });
    return this.http.get(environment.apiEndpoint+'verConsultas',{headers});
  }

  public listarDisponibilidades(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
    });
    return this.http.get(environment.apiEndpoint+'verDisponibilidades',{headers});
  }

  public crearDisponibilidad(data:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
      })
      return this.http.post(environment.apiEndpoint+'createDispo',data,{headers});
  }

  public dispo(id:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
      })
      return this.http.post(environment.apiEndpoint+'dispo',id,{headers});
  }

  public editDispo(id:string,data:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
      })
      return this.http.put(environment.apiEndpoint+'editDispo/'+id,data,{headers});
  }
}
