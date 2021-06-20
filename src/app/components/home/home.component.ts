import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { AdministratorService } from 'src/app/services/administrator.service';
import { RecepcionistaService } from 'src/app/services/recepcionista.service';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{

  //Roles
  paciente:boolean = false;
  doctor:boolean = false;
  recepcion:boolean = false;
  administrador:boolean = false;

  //Información
  datos_dash:[] = [];

  //Rutas

  rutas = {
    asignadas: '',
    asistidas: '',
    canceladas: '',
    disponibilidades:'',
    activos:'',
    inactivos:''
  };

  //CARD DISPO
  dispo= this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: '', cols: 1, rows: 1 },
        ];
      }
      return [
        { title: '', cols: 2, rows: 2 }
      ];
    })
  );

  //CARD CALENDARIO
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: '', cols: 1, rows: 1 },
        ];
      }
      return [
        { title: '', cols: 2, rows: 2 }
      ];
    })
  );

  //CARD PERSONAL
  personal = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: '', cols: 1, rows: 1 },
        ];
      }
      return [
        { title: '', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private auth:AuthService,
              private doctorService:DoctorService,private adminService:AdministratorService,
              private recepcionService:RecepcionistaService, private pacienteService:PacienteService) {}

  ngOnInit():void{
    this.tipoUsuario();
  }


/*
 *Función para validar el tipo de usuario que se ha logueado
 *se conecta al servicio Auth y tomamos la propiedad usuario.rol 
 */  
  tipoUsuario(){
    switch (this.auth.usuario.tipoUsuario) {
      case 'administrador':
        this.administrador = true
        this.adminService.adminDash().subscribe((resp:any)=>{
          this.datos_dash = resp
          this.rutas.asignadas = '/admin/citas';
          this.rutas.asistidas = '/admin/citas';
          this.rutas.canceladas = '/admin/citas';
          this.rutas.disponibilidades = '/admin/citas';
          this.rutas.activos = '/admin/usuarios';
          this.rutas.inactivos = '/admin/usuarios';
        })
        break;
      
      case 'doctor':
        this.doctor = true
        this.doctorService.doctorDash().subscribe((resp:any)=>{
          this.datos_dash = resp;
          this.rutas.asignadas = '/doctor/agenda';
        })
        break;

      case 'paciente':
        this.paciente = true
        this.pacienteService.pacienteDash().subscribe((resp:any)=>{
          this.datos_dash = resp
          this.rutas.asignadas = '/paciente/citas';
          this.rutas.asistidas = '/paciente/historial';
          this.rutas.canceladas = '/paciente/historial';
        })
        break;

      case 'recepcion':
        this.recepcion = true
        this.recepcionService.recepDash().subscribe((resp:any)=>{
          this.datos_dash = resp
          this.rutas.asignadas = '/recepcion/citas';
          this.rutas.asistidas = '/recepcion/citas';
          this.rutas.canceladas = '/recepcion/citas';
          this.rutas.disponibilidades = '/recepcion/dispo';
        })
        break;
    
      default:
        break;
    }
  }
}


