import { Component, OnInit, Inject, DoCheck } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';


import { RecepcionistaService } from 'src/app/services/recepcionista.service';
import { now } from 'moment';
import * as moment from 'moment';

import Swal from 'sweetalert2';



@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit, DoCheck {
  dispoGroup: FormGroup;
  medicos:[]=[];
  consultorio:[]=[];
  consultas:[]=[];
  disponibilidades:[]=[];
  estadoDispo:[]=[];
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
  constructor(private fb:FormBuilder,public dialogRef:MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private recepcionista:RecepcionistaService) {

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
    this.buscarDispo();
  }

  ngDoCheck(){
    this.validacionHora();
    console.log(this.horaInicio);
  }

  cerrar():void{
    console.log("Clickeado");
    this.dialogRef.close();
  }

  guardar(){
    this.dispoGroup.value.horaInicio = moment(this.dispoGroup.value.horaInicio).format("YYYY-MM-DD,hh:mm:ss");
    this.dispoGroup.value.horaFinal = moment(this.dispoGroup.value.horaFinal).format("YYYY-MM-DD,hh:mm:ss");
    this.dialogRef.close(
      this.recepcionista.editDispo(this.data.id,this.dispoGroup.value).subscribe((resp:any)=>{
      Swal.fire();
        Swal.close();
        Swal.fire ('Disponibilidad', 'Actualizada Correctamente', 'success');
      })
    )
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

  buscarDispo(){
    this.recepcionista.dispo(this.data.id).subscribe((resp:any)=>{
      console.log(resp['0'].id_persona);
      this.dispoGroup.setValue({
        id_persona: resp['0'].id_persona,
        horaInicio: moment(resp['0'].horaInicio).format(),
        horaFinal:moment(resp['0'].horaFinal).format(),
        estado:resp['0'].estado,
        tipo_consulta:resp['0'].tipo_consulta,
        consultorio:resp['0'].consultorio,
      })
    })
  }

  formDispo(){
    this.dispoGroup = this.fb.group({
      id_persona:['',Validators.required],
      horaInicio:['',Validators.required],
      horaFinal:['',Validators.required],
      estado:['',Validators.required],
      tipo_consulta:['',Validators.required],
      consultorio:['',Validators.required],
    })
  }

  validacionHora(){
    var valiHoraInicio = this.dispoGroup.get('horaInicio').value;
    var fechaactual = moment().format();

    if (valiHoraInicio < fechaactual){
      this.horaInicio = true;
    }else{
      this.horaInicio = false;
    }
  }
}
