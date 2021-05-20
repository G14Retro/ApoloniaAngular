import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { now } from 'moment';
import { RecepcionistaService } from 'src/app/services/recepcionista.service';
import { AuthService } from 'src/app/services/auth.service';
import { TablaDispoComponent } from '../tabla-dispo/tabla-dispo.component';
import { createDispoModel } from 'src/app/models/createDispo.model';

import * as moment from 'moment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})

export class AddDialogComponent implements OnInit {
  dispo:createDispoModel;
  dispoGroup: FormGroup;
  medicos:[]=[];
  consultorio:[]=[];
  consultas:[]=[];
  disponibilidades:[]=[];
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
  constructor(private auth:AuthService, private route:Router, private fb:FormBuilder,public AdddialogRef:MatDialogRef<AddDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any, private recepcionista:RecepcionistaService,){
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(now())
    this.maxDate = new Date(currentYear+1,11,31)
  }

  ngOnInit(): void {
    this.formDispo();
    this.verMedicos();
    this.verConsultorios();
    this.verConsultas();
    this.verDisponibilidades();
  }

  cerrar():void{
    this.AdddialogRef.close();
  }

  guardar(){
  this.dispoGroup.value.horaInicio = moment(this.dispoGroup.value.horaInicio).format("YYYY-MM-DD,hh:mm:ss");
  this.dispoGroup.value.horaFinal = moment(this.dispoGroup.value.horaFinal).format("YYYY-MM-DD,hh:mm:ss");
  if(this.dispoGroup.invalid){
    alert("campo imcompleto");
    return;
  }

  this.AdddialogRef.close(this.recepcionista.crearDisponibilidad(this.dispoGroup.value).subscribe((resp:any)=>{
    Swal.fire({
      allowOutsideClick: false,
      icon:'info',
      title: 'Espere por favor...'
    });
    Swal.fire();
      Swal.close();
      Swal.fire ('Disponibilidad', 'Creada Correctamente', 'success');
      this.route.navigateByUrl('/recepcion/dispo');
    },
    ));
  }

  verMedicos(){
    this.recepcionista.listarMedicos().subscribe((resp:any)=>{
      this.medicos = resp;
    })
  }

  verConsultorios(){
    this.recepcionista.listarConsultorios().subscribe((resp:any)=>{
      this.consultorio = resp;
    })
  }

  verConsultas(){
    this.recepcionista.listarConsultas().subscribe((resp:any)=>{
      this.consultas = resp;
    })
  }

  verDisponibilidades(){
    this.recepcionista.listarDisponibilidades().subscribe((resp:any)=>{
      this.disponibilidades = resp;
    })
  }

  formDispo(){
    this.dispo = new createDispoModel;
    this.dispoGroup = this.fb.group({
      id_persona:new FormControl('', [Validators.required]),
     // id_persona:['',[Validators.required]],
      horaInicio:['',[Validators.required]],
      horaFinal:['',[Validators.required]],
      estado:['',[Validators.required]],
      tipo_consulta:['',[Validators.required]],
      consultorio:['',[Validators.required]],
    });
  }
}
