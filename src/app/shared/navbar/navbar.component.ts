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
  admin:boolean = true;
  doctoropc:boolean = true;
  recepcionistapc: boolean = true;
  paciente:boolean = true;
  constructor(private auth:AuthService) {
    this.nombre = auth.usuario.nombre + " " + auth.usuario.apellido;
    this.rol = auth.usuario.tipoUsuario;
  }

  ngOnInit(): void {
    if (this.rol == 'administrador') {
      this.admin = true;
    } else {
      this.admin = false;
    }

    if (this.rol == 'doctor') {
      this.doctoropc = true;
    } else {
      this.doctoropc = false;
    }

    if(this.rol == 'recepcion'){
      this.recepcionistapc = true;
    }else{
      this.recepcionistapc = false;
    }

    if (this.rol == 'paciente') {
      this.paciente = true
    } else {
      this.paciente = false
    }
  }

  logout(){
    this.auth.logout().subscribe(
      (resp)=>{
      location.reload()}
    );
  }
}
