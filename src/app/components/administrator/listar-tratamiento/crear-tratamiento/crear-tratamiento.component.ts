import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { treatmentModel } from 'src/app/models/treatment.model';
import {AdministratorService } from 'src/app/services/administrator.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-tratamiento',
  templateUrl: './crear-tratamiento.component.html',
  styleUrls: ['./crear-tratamiento.component.css']
})
export class CrearTratamientoComponent implements OnInit {

  nombre_tratamiento:[]=[];
  valor_tratamiento:[]=[];
  treatmentForm:FormGroup
  datos:treatmentModel;

  constructor(
    private formBuilder: FormBuilder,
    private administratorService: AdministratorService,
    private router:Router,
  ) { 
    this.treatmentForm = this.formBuilder.group({
      nombre_tratamiento:'',
      valor_tratamiento:'',
    })
  }

  ngOnInit(): void {

  }
  crearTratamiento (){

    this.datos=this.treatmentForm.value;
    this.administratorService.crearTratamiento(this.datos).subscribe(resp=>{
    console.log(resp)
    Swal.fire(
      'En hora buena',
      'Tratamiento creado correctamente!',
      'success'
    )
    this.router.navigateByUrl('/admin/tratamiento');

  },
  err=>{
    console.log(err);
  }
  );
  }

}
