import { Component, OnInit, Inject, DoCheck } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';

import { RecepcionistaService } from 'src/app/services/recepcionista.service';
import { now } from 'moment';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { createDispoModel } from 'src/app/models/createDispo.model';

@Component({
  selector: 'app-editar-cita',
  templateUrl: './editar-cita.component.html',
  styleUrls: ['./editar-cita.component.css']
})
export class EditarCitaComponent implements OnInit {

  cita:createDispoModel;
  citaGroup: FormGroup;
  medicos:[]=[];
  estado:[]=[];
  consultas:[]=[];
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
    @Inject(MAT_DIALOG_DATA) public data:any, private recepcionista:RecepcionistaService) {

      const currentYear = new Date().getFullYear();
      this.minDate = new Date(now())
      this.maxDate = new Date(currentYear+1,11,31)
    }

  ngOnInit(): void {
    this.formDispo();
    this.buscarDispo();
  }

  cerrar():void{
    console.log("Clickeado");
    this.dialogRef.close();
  }

  guardar(){
  }

  buscarDispo(){
    this.recepcionista.dispo(this.data.id).subscribe((resp:any)=>{
      console.log(resp['0'].id_persona);
      this.citaGroup.setValue({
        id_persona: resp['0'].id_persona,
        fechaInicio: moment(resp['0'].fechaInicio).format(),
        estado:resp['0'].estado,
        consulta:resp['0'].consulta,
      })
    })
  }

  formDispo(){
    this.cita = new createDispoModel;
    this.citaGroup = this.fb.group({
      medico:new FormControl('', [Validators.required]),
      consulta:['',[Validators.required]],
      fechaInicio:['',[Validators.required]],
      estado:['',[Validators.required]],
    })
  }
}
