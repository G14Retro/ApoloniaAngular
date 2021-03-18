import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { userModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { FormGroup,FormBuilder,Validators } from "@angular/forms";
import ciudadesJSON from '../../shared/city/cities.json';

interface tipoDocumento {
  nombre: string;
  abreviacion:string;
}

interface genero{
  nombre: string;
  valor:string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:userModel;
  confir:Boolean=false;
  isLinear = true;
  personalFormGroup: FormGroup;
  contactFormGroup: FormGroup;
  loginFormGroup: FormGroup;
  ciudades:any[] = [];
  minDate:Date;
  maxDate:Date;
  tipoDocumento: tipoDocumento[] =[
    {nombre:'Cedula de Ciudadanía',abreviacion:'cc'},
    {nombre:'Tarjeta de Identidad',abreviacion:'ti'},
    {nombre:'Cedula de Extrangería',abreviacion:'ce'},
    {nombre:'Pasaporte',abreviacion:'pp'},
  ];
  genero:genero[] =[
    {nombre:'Masculino',valor:'masculino'},
    {nombre:'Femenino',valor:'femenino'},
  ];
  startDate = new Date(1990, 0, 1);
  constructor(private auth:AuthService, private route:Router, private fb:FormBuilder) { 
    this.ciudades = ciudadesJSON;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    this.minDate = new Date(currentYear-31,0,1)
    this.maxDate = new Date(currentYear-1,11,31)
  }

  get validPassword(){
     if (this.loginFormGroup.controls['password'].touched && this.loginFormGroup.controls['password_confirmation'].touched) {
      if (this.loginFormGroup.value.password != this.loginFormGroup.value.password_confirmation) {
        console.log(this.loginFormGroup.value.password);
        console.log(this.loginFormGroup.value.password_confirmation);
        return true;
      } else {
        return false;
      }
    }
  }

  ngOnInit(): void {
    this.user = new userModel;
    this.personalFormGroup = this.fb.group({
      tipo_documento: ['',Validators.required],
      documento: ['',[Validators.required,Validators.minLength(8)]],
      nombre: ['',Validators.required],
      apellido: ['',Validators.required],
      genero:['',Validators.required],
      fecha_nacimiento:['',Validators.required],
    });
    this.contactFormGroup  = this.fb.group({
      direccion:['',Validators.required],
      ciudad:['',Validators.required],
      telefono:['',Validators.required],
    });
    this.loginFormGroup = this.fb.group({
      correo:['',[Validators.required,Validators.email]],
      confirmacion_correo:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
      password_confirmation:['',[Validators.required,]],
    });
  }
  patienSave(){  
    this.user.tipo_documento = this.personalFormGroup.value.tipo_documento.abreviacion;
    this.user.numero_documento = this.personalFormGroup.value.documento;
    this.user.nombre = this.personalFormGroup.value.nombre;
    this.user.apellido = this.personalFormGroup.value.apellido;
    this.user.genero = this.personalFormGroup.value.genero.valor;
    this.user.fecha_nacimiento = moment(this.personalFormGroup.value.fecha_nacimiento).format("YYYY-MM-DD");
    this.user.direccion = this.contactFormGroup.value.direccion;
    this.user.ciudad = this.contactFormGroup.value.ciudad;
    this.user.telefono = this.contactFormGroup.value.telefono;
    this.user.correo = this.loginFormGroup.value.correo;
    this.user.password = this.loginFormGroup.value.password;
    this.user.password_confirmation = this.loginFormGroup.value.password_confirmation;
    Swal.fire({
      allowOutsideClick: false,
      icon:'info',
      title: 'Espere por favor...'
    });
    Swal.showLoading();
    this.auth.patienSave(this.user)
    .subscribe(resp=>{
      Swal.close();
      Swal.fire ('Guardado', '', 'success');
      this.route.navigateByUrl('/login');
    }, 
    (err)=>{
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error alregistrarse',
        text: err.error.errors.correo + ', '+ err.error.errors.numero_documento,
      })});
  }
}
