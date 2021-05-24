import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { create } from 'node:domain';
import { environment } from 'src/environments/environment';
import { createDispoModel } from '../models/createDispo.model';
import { dispoModel } from '../models/dispo.model';
import { AuthService } from './auth.service';
import { citaModel } from '../models/cita.model';


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

  crearDisponibilidad(create:createDispoModel){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
      });
      const data = {
        ...create
      };
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

  public eliminarDispo(id:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
      })
      return this.http.delete(environment.apiEndpoint+'destroy/'+id,{headers});
  }


    cita(create:citaModel){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
      });
      const data = {
        ...create
      };
      return this.http.post(environment.apiEndpoint+'cita',data,{headers});
  }

  leerCitas(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
      });
      return this.http.get(environment.apiEndpoint+'cita',{headers})
  }

  public getDispo(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
      })
      return this.http.get(environment.apiEndpoint+'getDispo',{headers});
  }

  /**
   * public tipoConsulta(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
      })
      return this.http.get(environment.apiEndpoint+'tipoConsulta',{headers});
  }
  **/

  public listarPacientes(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
      })
      return this.http.get(environment.apiEndpoint+'verPacientes',{headers});
  }

  public listarDocumentos(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
    });
    return this.http.get(environment.apiEndpoint+'buscarDocumento',{headers});
  }
}
