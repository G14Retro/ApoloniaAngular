import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {
  nombre:string;
  rol:string;
  opciones:boolean = true;
  constructor(private auth:AuthService) { 
    this.nombre = auth.usuario.nombre + " " + auth.usuario.apellido;
    this.rol = auth.usuario.tipoUsuario;
  }
  
  ngOnInit(): void {
  }

  logout(){
    this.auth.logout().subscribe(
      (resp)=>{
      location.reload()}
    );
  }
}
