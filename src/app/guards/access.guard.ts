import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {

  constructor( private auth: AuthService, private router: Router ) {}
  canActivate():boolean{
    if (this.auth.authentication()) {
      console.log("Access Guard " + this.auth.authentication())
      this.router.navigateByUrl('/login');
    } else {
      return true;
    }
  }
  
}
