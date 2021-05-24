import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { now } from 'moment';
import { RecepcionistaService } from 'src/app/services/recepcionista.service';
import { createDispoModel } from 'src/app/models/createDispo.model';

import * as moment from 'moment';
import Swal from 'sweetalert2';
import { citaModel } from 'src/app/models/cita.model';

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.css']
})
export class CrearCitaComponent implements OnInit {
  citaGroup: FormGroup;
  paciente:[]=[];
  numero_documento:[]=[];
  estado:[]=[];
  consultas:[]=[];
  fechas:[]=[];
  loading:boolean = false;
  cita:citaModel;
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
    this.cita = new citaModel();
    this.formCita();
    //this.tipoConsulta();
    this.verConsultas();
    this.verPacientes();
  }

  cerrar():void{
    this.AdddialogRef.close();
  }

  guardar(){
    this.cita.disponibilidad = this.citaGroup.get('fechaInicio').value;
    this.cita.id_persona = this.citaGroup.get('id_persona').value;

  if(this.citaGroup.invalid){
    return;
  }

  this.AdddialogRef.close(this.recepcionista.guardarCita(this.cita).subscribe((resp:any)=>{
    Swal.fire({
      allowOutsideClick: false,
      icon:'info',
      title: 'Espere por favor...'
    });
    Swal.fire();
      Swal.close();
      Swal.fire ('Guardado', resp.message, 'success');
      this.route.navigateByUrl('/recepcion/citas');
    },
    ));
  }

    verConsultas(){
      this.loading = true;
      this.recepcionista.listarConsultas().subscribe((resp:any)=>{
        this.consultas = resp;
        this.loading = false;
      })
    }

    verPacientes(){
      this.recepcionista.listarPacientes().subscribe((resp:any)=>{
        this.paciente = resp;
    })
  }

  buscarPaciente(){
    this.recepcionista.buscarPaciente(this.citaGroup.get('numero_documento').value).subscribe((resp:any)=>{
      this.citaGroup.get('id_persona').setValue(resp['0'].id);
      this.citaGroup.get('nombre').setValue(resp['0'].nombre);
      this.citaGroup.get('apellido').setValue(resp['0'].apellido);
    })
  }

  formCita(){
    this.citaGroup = this.fb.group({
      consulta:['',[Validators.required]],
      fechaInicio:['',[Validators.required]],
      numero_documento:['', [Validators.required]],
      nombre:{value:'',disabled:true},
      apellido:{value:'',disabled:true},
      id_persona:'',
    });
  }

  llamarFechas(id:string){
    this.recepcionista.llamarFechas(id).subscribe((resp:any)=>{
      this.fechas = resp
    })
  }
}
