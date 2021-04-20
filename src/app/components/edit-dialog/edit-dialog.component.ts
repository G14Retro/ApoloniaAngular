import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { now } from 'moment';
import { RecepcionistaService } from 'src/app/services/recepcionista.service';
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  dispoGroup: FormGroup;
  medicos:[]=[];
  consultorio:[]=[];
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
  }

  cerrar():void{
    console.log("Clickeado");
    this.dialogRef.close();
  }

  guardar(){
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

  formDispo(){
    this.dispoGroup = this.fb.group({
      medico:['',Validators.required],
      horaInicio:['',Validators.required],
      horaFinal:['',Validators.required]
    })
  }
}
