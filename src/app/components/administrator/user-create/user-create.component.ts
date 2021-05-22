import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userModel } from 'src/app/models/user.model';
import {AdministratorService } from 'src/app/services/administrator.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import ciudadesJSON from '../../shared/city/cities.json';
import {CITIES} from '../../../shared/city/cities.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})

export class UserCreateComponent implements OnInit {

  tipo_documentos:[]=[];
  generos:[]=[];
  estado: []=[];
  tipo_usuario: []=[];
  userForm: FormGroup;
  datos: userModel;
  ciudades:any[] = [];
  minDate:Date;
  maxDate:Date;

  startDate = new Date(1990, 0, 1);
  constructor(

    private formBuilder: FormBuilder,
    private administratorService: AdministratorService,
    private router:Router,
  ) {

    const currentYear = new Date().getFullYear();
    this.ciudades = CITIES;
    console.log(this.ciudades);
    this.minDate = new Date(currentYear-31,0,1)
    this.maxDate = new Date(currentYear-1,11,31)
    this.userForm = this.formBuilder.group({
      tipo_documento: '',
      numero_documento: '',
      nombre: '',
      apellido :'',
      direccion: '',
      ciudad: '',
      telefono: '',
      correo: '',
      genero: '',
      fecha_nacimiento: '',
      estado: '',
      tipo_usuario: '',
      password:''
    })
  }

  ngOnInit(): void {
      this.verDocumento();
      this.verEstado();
      this.verTusuario();


  }

  verDocumento(){
    this.administratorService.listarDocumentos().subscribe((resp:any)=>{
      this.tipo_documentos = resp;
    })
  }
  verEstado(){
    this.administratorService.listarEstado().subscribe((resp:any)=>{
      this.estado = resp;
    })
  }
  verTusuario(){
    this.administratorService.listarTusuario().subscribe((resp:any)=>{
      this.tipo_usuario = resp;
    })
  }
  validPassword():boolean
  {
      if (this.userForm.get('password_confirmation').touched && this.userForm.get('password_confirmation').valueChanges) {
        if (this.userForm.value.password_confirmation == this.userForm.value.password) {
          return false
        }
      } else {
        return true
      }
  }

  validMail():boolean{
    if (this.userForm.get('confirmacion_correo').touched && this.userForm.get('confirmacion_correo').valueChanges) {
      if (this.userForm.value.confirmacion_correo == this.userForm.value.correo) {
        return false
      } else {
        return true
      }
    }
  }

  crearUsuario (){

    this.datos=this.userForm.value;
    this.datos.ciudad = this.userForm.value.ciudad['ciudad'];
    this.datos.fecha_nacimiento = moment(this.userForm.value.fecha_nacimiento).format("YYYY-MM-DD");
    this.administratorService.crearUsuario(this.datos).subscribe(resp=>{
    console.log(resp)
    Swal.fire(
      'En hora buena',
      'Usuario creado correctamente!',
      'success'
    )
    this.router.navigateByUrl('/admin/usuarios');

  },
  err=>{
    console.log(err);
  }
  );

}

}
