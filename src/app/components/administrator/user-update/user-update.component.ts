import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { userModel } from 'src/app/models/user.model';
import { AdministratorService } from 'src/app/services/administrator.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  tipo_documentos:[]=[];
  generos:[]=[];
  estado: []=[];
  tipo_usuario: []=[];
  userForm: FormGroup;
  datos: userModel;
  ciudades:any[] = [];
  idUpdate:string;
  minDate:Date;
  maxDate:Date;

  startDate = new Date(1990, 0, 1);

  constructor(private administratorService:AdministratorService,
    private ruta:ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    )
    {
      const currentYear = new Date().getFullYear();
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
      this.buscarUser();

  }

  buscarUser(){
    this.ruta.params.subscribe(params =>{
      this.idUpdate=params['id'];
      this.administratorService.buscarUser(params['id']).subscribe((resp:any[])=>{
        this.userForm.setValue({
          tipo_documento: resp['tipo_documento'],
          numero_documento: resp['numero_documento'],
          nombre: resp['nombre'],
          apellido: resp['apellido'],
          direccion: resp['direccion'],
          ciudad: resp['ciudad'],
          telefono: resp['telefono'],
          correo: resp['correo'],
          genero: resp['genero'],
          fecha_nacimiento: resp['fecha_nacimiento'],
          estado: resp['estado'],
          tipo_usuario: resp['tipo_usuario'],
          password: '',
        });
      })
    })
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

  updateUser(){
    this.datos=this.userForm.value;
    this.datos.fecha_nacimiento = moment(this.userForm.value.fecha_nacimiento).format("YYYY-MM-DD");
  this.administratorService.updateUser(this.idUpdate,this.datos).subscribe(resp=>{
    console.log(resp)
    Swal.fire(
      'En hora buena',
      'Usuario actualizado correctamente!',
      'success'
    )
    this.router.navigateByUrl('/admin/usuarios');

  },
  err=>{
    console.log(err);
  }
  );

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

  }



