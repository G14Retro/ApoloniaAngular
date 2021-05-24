import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { symptomModel } from 'src/app/models/symptom.model';
import { AdministratorService } from 'src/app/services/administrator.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-actualizar-sintomas',
  templateUrl: './actualizar-sintomas.component.html',
  styleUrls: ['./actualizar-sintomas.component.css']
})
export class ActualizarSintomasComponent implements OnInit {

  nombre_sintoma:[]=[];
  color:[]=[];
  symptomForm:FormGroup
  datos:symptomModel;
  idUpdate:string;

  constructor(
    private formBuilder: FormBuilder,
    private administratorService: AdministratorService,
    private router:Router,
    private ruta:ActivatedRoute,
  ) { 
    this.symptomForm = this.formBuilder.group({
      nombre_sintoma:'',
      color:'',
    })
  }

  ngOnInit(): void {
    this.buscarSintoma();
  }
  buscarSintoma(){
    this.ruta.params.subscribe(params =>{
      this.idUpdate=params['id'];
      this.administratorService.buscarSintoma(params['id']).subscribe((resp:any)=>{
        this.symptomForm.setValue({
          nombre_sintoma: resp['0'].nombre_sintoma,
          color: resp['0'].color,
          
        });
      })
    })
  }
  actualizarSintoma(){
    this.datos=this.symptomForm.value;
  this.administratorService.actualizarSintoma(this.idUpdate,this.datos).subscribe(resp=>{
    console.log(resp)
    Swal.fire(
      'En hora buena',
      'Usuario actualizado correctamente!',
      'success'
    )
    this.router.navigateByUrl('/admin/sintomas');

  },
  err=>{
    console.log(err);
  }
  );

}

}
