import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorGuard implements CanActivate {
  constructor( private auth: AuthService) {}
  canActivate():boolean{
    if (this.auth.usuario.tipoUsuario == 'doctor') {
        return true;
    } 
  }
}
