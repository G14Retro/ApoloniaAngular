import { Component, OnInit, Inject, TRANSLATIONS } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { now } from 'moment';
import { RecepcionistaService } from 'src/app/services/recepcionista.service';
import { AuthService } from 'src/app/services/auth.service';
import { TablaCitasComponent } from '../tabla-citas.component'
import { createDispoModel } from 'src/app/models/createDispo.model';
import { citaModel } from 'src/app/models/cita.model';

import * as moment from 'moment';
import Swal from 'sweetalert2';
import { from } from 'rxjs';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.css']
})
export class CrearCitaComponent implements OnInit {
  cita:createDispoModel;
  citaGroup: FormGroup;
  paciente:[]=[];
  numero_documento:[]=[];
  estado:[]=[];
  consultas:[]=[];
  fechaInicio:[]=[];
  //DateTime Picker

  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = true;
  public touchUi = false;
  public enableMeridian = false;
  minDate:Date;
  maxDate:Date;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'accent';
  startDate = new Date(now());

  public dateControlMinMax = new FormControl(new Date());
  constructor(private route:Router, private fb:FormBuilder, public AdddialogRef:MatDialogRef<CrearCitaComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any, private recepcionista:RecepcionistaService,){
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(now())
    this.maxDate = new Date(currentYear+1,11,31)
  }

  ngOnInit(){
    this.formDispo();
    this.getDispo();
    //this.tipoConsulta();
    this.verConsultas();
    this.verPacientes();
    this.buscarDocumento();
  }

  cerrar():void{
    this.AdddialogRef.close();
  }

  guardar(){
  this.citaGroup.value.horaInicio = moment(this.citaGroup.value.fechaInicio).format("YYYY-MM-DD,hh:mm:ss");
  if(this.citaGroup.invalid){
    alert("campo imcompleto");
    return;
  }

  this.AdddialogRef.close(this.recepcionista.cita(this.citaGroup.value).subscribe((resp:any)=>{
    Swal.fire({
      allowOutsideClick: false,
      icon:'info',
      title: 'Espere por favor...'
    });
    Swal.fire();
      Swal.close();
      Swal.fire ('Disponibilidad', 'Creada Correctamente', 'success');
      this.route.navigateByUrl('/recepcion/cita');
    },
    ));
  }

  getDispo(){
    this.recepcionista.getDispo().subscribe((resp:any)=>{
      console.log(resp);
    })
    }

    verConsultas(){
      this.recepcionista.listarConsultas().subscribe((resp:any)=>{
        this.consultas = resp;
      })
    }

    verPacientes(){
      this.recepcionista.listarPacientes().subscribe((resp:any)=>{
        this.paciente = resp;
    })
  }

  buscarDocumento(){
    this.recepcionista.listarDocumentos().subscribe((resp:any)=>{
    this.numero_documento = resp;
  })
}

  formDispo(){
    this.cita = new createDispoModel;
    this.citaGroup = this.fb.group({
      pacientes:['', [Validators.required]],
      numero_documento:['', [Validators.required]],
      consulta:['',[Validators.required]],
      fechaInicio:['',[Validators.required]],
      estado:['',[Validators.required]],
    });
  }
}
