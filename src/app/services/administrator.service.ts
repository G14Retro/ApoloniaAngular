import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from 'src/environments/environment'
import { AuthService } from './auth.service';
import { userModel } from '../models/user.model';
import { treatmentModel } from '../models/treatment.model';
import { symptomModel } from '../models/symptom.model';

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
    return this.http.get(environment.apiEndpoint+'buscarUsuario/'+id,{headers});
  }
  public updateUser(id:string, data:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
    });
    return this.http.put(environment.apiEndpoint+'actualizarUsuario/'+id,data,{headers});
  }
public listarTratamientos(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
    });
    return this.http.get(environment.apiEndpoint+'listarTratamientos',{headers});
  }
  public listarSintomas(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
    });
    return this.http.get(environment.apiEndpoint+'listarSintomas',{headers});
  }
  public crearTratamiento(data:treatmentModel){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
      })
      const tratamiento=({
        ...data
      })
      console.log(tratamiento);
      return this.http.post(environment.apiEndpoint+'crearTratamiento',tratamiento,{headers});
    
  }
  public crearSintomas(data:symptomModel){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
      })
      const sintoma=({
        ...data
      })
      console.log(sintoma);
      return this.http.post(environment.apiEndpoint+'crearSintomas',sintoma,{headers});
  }
  public actualizarTratamiento(id:string, data:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
    });
    return this.http.put(environment.apiEndpoint+'actualizarTratamiento/'+id,data,{headers});
  }
  public actualizarSintoma(id:string, data:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
    });
    return this.http.put(environment.apiEndpoint+'actualizarSintoma/'+id,data,{headers});
  }
  public buscarTratamiento(id:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
    });
    return this.http.post(environment.apiEndpoint+'buscarTratamiento',id,{headers});
  }
  public buscarSintoma(id:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
    });
    return this.http.post(environment.apiEndpoint+'buscarSintoma',id,{headers});
  }
  public elimiarTratamiento(id:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
      })
      return this.http.delete(environment.apiEndpoint+'elimiarTratamiento/'+id,{headers});
  }
  public elimiarSintoma(id:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
      })
      return this.http.delete(environment.apiEndpoint+'elimiarSintoma/'+id,{headers});
  }

  adminDash(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': 'Bearer '+ this.auth.usuario.token
      });
    return this.http.get(environment.apiEndpoint+'adminDash',{headers});
  }

}

