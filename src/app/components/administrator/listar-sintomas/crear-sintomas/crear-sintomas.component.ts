import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { symptomModel } from 'src/app/models/symptom.model';
import {AdministratorService } from 'src/app/services/administrator.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-crear-sintomas',
  templateUrl: './crear-sintomas.component.html',
  styleUrls: ['./crear-sintomas.component.css']
})
export class CrearSintomasComponent implements OnInit {

  nombre_sintoma:[]=[];
  color:[]=[];
  symptomForm:FormGroup
  datos:symptomModel;

  constructor(
    private formBuilder: FormBuilder,
    private administratorService: AdministratorService,
    private router:Router,
  ) { 
    this.symptomForm = this.formBuilder.group({
      nombre_sintoma:'',
      color:'',
    })
  }

  ngOnInit(): void {
    
   
  }
  crearSintomas (){

    this.datos=this.symptomForm.value;
    this.administratorService.crearSintomas(this.datos).subscribe(resp=>{
    console.log(resp)
    Swal.fire(
      'En hora buena',
      'Tratamiento creado correctamente!',
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
