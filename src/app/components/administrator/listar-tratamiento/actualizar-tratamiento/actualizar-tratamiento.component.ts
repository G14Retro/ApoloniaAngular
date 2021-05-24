import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { treatmentModel } from 'src/app/models/treatment.model';
import { AdministratorService } from 'src/app/services/administrator.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-tratamiento',
  templateUrl: './actualizar-tratamiento.component.html',
  styleUrls: ['./actualizar-tratamiento.component.css']
})
export class ActualizarTratamientoComponent implements OnInit {

  nombre_tratamiento:[]=[];
  valor_tratamiento:[]=[];
  treatmentModel:FormGroup
  datos:treatmentModel;
  idUpdate:string;

  constructor(
    private formBuilder: FormBuilder,
    private administratorService: AdministratorService,
    private router:Router,
    private ruta:ActivatedRoute,
  ) { 
    this.treatmentModel = this.formBuilder.group({
      nombre_tratamiento:'',
      valor_tratamiento:'',
      
    })
  }

  ngOnInit(): void {
    this.buscarTratamiento();
  }
  buscarTratamiento(){
    this.ruta.params.subscribe(params =>{
      this.idUpdate=params['id'];
      this.administratorService.buscarTratamiento(params['id']).subscribe((resp:any)=>{
        this.treatmentModel.setValue({
          nombre_tratamiento: resp['0'].nombre_tratamiento,
          valor_tratamiento: resp['0'].valor_tratamiento,
          
        });
      })
    })
  }
  actualizarTratamiento(){
    this.datos=this.treatmentModel.value;
  this.administratorService.actualizarTratamiento(this.idUpdate,this.datos).subscribe(resp=>{
    console.log(resp)
    Swal.fire(
      'En hora buena',
      'Usuario actualizado correctamente!',
      'success'
    )
    this.router.navigateByUrl('/admin/tratamientos');

  },
  err=>{
    console.log(err);
  }
  );

}

}
