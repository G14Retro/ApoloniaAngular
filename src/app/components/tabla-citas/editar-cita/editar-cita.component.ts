import { Component, OnInit, Inject, DoCheck } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RecepcionistaService } from 'src/app/services/recepcionista.service';
import { now } from 'moment';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { citaModel } from 'src/app/models/cita.model';

@Component({
  selector: 'app-editar-cita',
  templateUrl: './editar-cita.component.html',
  styleUrls: ['./editar-cita.component.css']
})
export class EditarCitaComponent implements OnInit {
  cita:citaModel;
  citaGroup: FormGroup;
  estados:[]=[];
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
  horaInicio:boolean;
  public color: ThemePalette = 'primary';
  startDate = new Date(now());
  public dateControlMinMax = new FormControl(new Date());
  constructor(private fb:FormBuilder,public dialogRef:MatDialogRef<EditarCitaComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private recepcionista:RecepcionistaService, private ruta:ActivatedRoute) {
      const currentYear = new Date().getFullYear();
      this.minDate = new Date(now())
      this.maxDate = new Date(currentYear+1,11,31)
    }

  ngOnInit(): void {
    this.cita = new citaModel();
    this.verEstados();
    this.verDisponibilidad();
    this.formDispo();
    this.buscarCitaId();
  }

  cerrar():void{
    this.dialogRef.close();
  }

  guardar(){
    console.log(this.citaGroup.value);
  }


  formDispo(){
    this.citaGroup = this.fb.group({
      estado:['', [Validators.required]],
      disponibilidad: ['', [Validators.required]],
      id_persona: ['', [Validators.required]],
    })
  }

  verEstados(){
    this.recepcionista.verEstadoCita().subscribe((resp:any)=>{
      console.log(resp);
      this.estados = resp
    })
  }

  verDisponibilidad(){
    this.recepcionista.listarDispo().subscribe((resp:any)=>{
      this.disponibilidades = resp
    })
  }

  buscarCitaId(){
    this.recepcionista.buscarCitaId(this.data.id).subscribe((resp:any)=>{
     this.cita = resp[0];
     this.citaGroup.get('estado').setValue(this.cita.estado);
     this.citaGroup.get('disponibilidad').setValue(this.cita.disponibilidad);
     this.citaGroup.get('id_persona').setValue(this.cita.id_persona);
     console.log(this.citaGroup.value);
    })
  }

}
