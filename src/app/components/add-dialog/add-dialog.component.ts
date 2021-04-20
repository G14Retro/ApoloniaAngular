import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { now } from 'moment';
import { RecepcionistaService } from 'src/app/services/recepcionista.service';
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';
import { TablaDispoComponent } from '../tabla-dispo/tabla-dispo.component';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
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
  public color: ThemePalette = 'primary';
  startDate = new Date(now());
  public dateControlMinMax = new FormControl(new Date());
  constructor(private fb:FormBuilder,public AdddialogRef:MatDialogRef<AddDialogComponent>,
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
  this.AdddialogRef.close(this.recepcionista.crearDisponibilidad(this.dispoGroup.value).subscribe((resp:any)=>{
    console.log(resp);
  }
  ,err=>{
    console.log(err);
  }));
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
    this.dispoGroup = this.fb.group({
      id_persona:['',Validators.required],
      horaInicio:['',Validators.required],
      horaFinal:['',Validators.required],
      estado:['',Validators.required],
      tipo_consulta:['',Validators.required],
      consultorio:['',Validators.required],
    })
  }
}
