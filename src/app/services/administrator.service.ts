import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from 'src/environments/environment'
import { AuthService } from './auth.service';
import { userModel } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AdministratorService {
  constructor(private http: HttpClient, private auth:AuthService) { }
  public query(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    })
    return this.http.get<any>(environment.apiEndpoint+'listarPacientes',{headers});
    
  }
  public crearUsuario(data:userModel){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      })
      const usuario=({
        ...data
      })
      console.log(usuario);
      return this.http.post(environment.apiEndpoint+'crearUsuario',usuario,{headers});
    
  }
  public listarDocumentos(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
    });
    return this.http.get(environment.apiEndpoint+'verDocumento',{headers});
  }
  public listarEstado(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
    });
    return this.http.get(environment.apiEndpoint+'verEstado',{headers});
  }
  public listarTusuario(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
    });
    return this.http.get(environment.apiEndpoint+'verTusuario',{headers});
  }
  public buscarUser(id:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
    });
    return this.http.post(environment.apiEndpoint+'buscarUsuario',id,{headers});
  }
  public updateUser(id:string, data:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
    });
    return this.http.put(environment.apiEndpoint+'actualizarUsuario/'+id,data,{headers});
  }


}

