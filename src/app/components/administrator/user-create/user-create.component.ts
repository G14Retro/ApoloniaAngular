import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {AdministratorService } from 'src/app/services/administrator.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
userForm: any;
  constructor(
    private formBuilder: FormBuilder,
    private administratorService: AdministratorService
  ) { 

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
      tipo_usuario: ''
    })
  }

  ngOnInit(): void {
  }
crearUsuario (){
  this.administratorService.crearUsuario(this.userForm.value);
  return "Usuario creado correctamente";
}
}
