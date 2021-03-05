import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { userModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { FormGroup,FormBuilder,Validators } from "@angular/forms";

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
  tipoDocumentoControl = new FormControl('',Validators.required);
  selectDocumento = new FormControl('',Validators.required);
  selectGenero = new FormControl('',Validators.required);
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
  constructor(private auth:AuthService, private route:Router, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.user = new userModel;
    this.personalFormGroup = this.fb.group({
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
      password_confirmation:['',Validators.required],
    });
  }
  
  patienSave(form:NgForm){  
    if(this.user.password != this.user.password_confirmation){
      this.confir=true;
      return;
    }else{
      this.confir=false;
    }
    if (form.invalid) {
      return;
    }
    this.user.fecha_nacimiento = moment(this.user.fecha_nacimiento).format("YYYY-MM-DD");
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
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: err.error.message
      })});
  }
}
