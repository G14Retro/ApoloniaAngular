import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { now } from 'moment';
import { RecepcionistaService } from 'src/app/services/recepcionista.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  dispoGroup: FormGroup;
  medicos:[]=[];
  consultorio:[]=[];
  minDate:Date;
  maxDate:Date;
  startDate = new Date(now());
  constructor(private fb:FormBuilder,public AdddialogRef:MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private recepcionista:RecepcionistaService) { 
    
      const currentYear = new Date().getFullYear();
      console.log(currentYear);
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
    this.AdddialogRef.close();
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
      horaFinal:['',Validators.required],
    })
  }
}
