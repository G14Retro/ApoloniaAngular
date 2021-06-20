import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userModel } from '../models/user.model';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario:userModel;
  headers;
  url:string = 'http://127.0.0.1:8000/api/apolonia/';
  constructor(private http:HttpClient) {
    this.sessionRead();
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization' : 'Bearer '+ this.usuario.token
    });
  }

  patienSave(user:userModel){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
      });
      const data = {
        ...user
      };
      return this.http.post(this.url+"signup",data, {headers});
    }

    login(user:userModel){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
        });
      const data ={
        ...user
      };
      return this.http.post(this.url+"login",data,{headers})
      .pipe(map(resp =>{
        this.sessionSave(resp['id'],resp['nombre'],resp['apellido'],resp['access_token'],resp['User_type']),
        (err=> console.log(err));
      }));
    }

    logout(){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Authorization' : 'Bearer '+this.usuario.token
        });
        this.removeSession();
        return this.http.get(this.url+'logout',{headers});
    }

    private sessionSave(id:string,nombre:string,apellido:string,token:string,tipoUsuario:string){
      this.usuario.id=id;
      this.usuario.nombre = nombre;
      this.usuario.apellido = apellido;
      this.usuario.token = token;
      this.usuario.tipoUsuario = tipoUsuario;
      sessionStorage.setItem('data',JSON.stringify(this.usuario));
    }
    sessionRead(){
      if (sessionStorage.getItem('data')) {
      this.usuario = JSON.parse(sessionStorage.getItem('data'));
      }
      else{
        this.usuario = new userModel;
      }
    }
    public authentication():boolean{
      if (this.usuario.token == null || this.usuario.token == "") {
        return true
      } else {
        return false;
      }
    }

    removeSession(){
      sessionStorage.removeItem('data');
      this.usuario = new userModel;
      console.log(this.usuario);
    }
  }
