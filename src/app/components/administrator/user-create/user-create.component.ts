import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { userModel } from 'src/app/models/user.model';
import {AdministratorService } from 'src/app/services/administrator.service';
import Swal from 'sweetalert2';



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
  
  crearUsuario (){
    this.datos=this.userForm.value;
  this.administratorService.crearUsuario(this.datos).subscribe(resp=>{
    console.log(resp)
    Swal.fire(
      'En hora buena',
      'Usuario creado correctamente!',
      'success'
    )
    
    
  },
  err=>{
    console.log(err);
  }
  );
  
}

}
