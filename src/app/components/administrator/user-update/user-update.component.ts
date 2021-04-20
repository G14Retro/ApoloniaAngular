import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { userModel } from 'src/app/models/user.model';
import { AdministratorService } from 'src/app/services/administrator.service';
import Swal from 'sweetalert2';


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

  constructor(private administratorService:AdministratorService, 
    private ruta:ActivatedRoute,
    private formBuilder: FormBuilder,
    )
     { 
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
      this.administratorService.buscarUser(params['id']).subscribe((resp:any)=>{
        this.userForm.setValue({
          tipo_documento: resp['0'].tipo_documento,
          numero_documento: resp['0'].numero_documento,
          nombre: resp['0'].nombre,
          apellido: resp['0'].apellido,
          direccion: resp['0'].direccion,
          ciudad: resp['0'].ciudad,
          telefono: resp['0'].telefono,
          correo: resp['0'].correo,
          genero: resp['0'].genero,
          fecha_nacimiento: resp['0'].fecha_nacimiento,
          estado: resp['0'].estado,
          tipo_usuario: resp['0'].tipo_usuario,
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
  this.administratorService.updateUser(this.idUpdate,this.datos).subscribe(resp=>{
    console.log(resp)
    Swal.fire(
      'En hora buena',
      'Usuario actualizado correctamente!',
      'success'
    )
    
    
  },
  err=>{
    console.log(err);
  }
  );
  
}
    
  }
    


