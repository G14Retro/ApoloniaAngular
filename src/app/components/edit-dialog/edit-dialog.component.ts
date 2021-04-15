import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { now } from 'moment';
import { RecepcionistaService } from 'src/app/services/recepcionista.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  dispoGroup: FormGroup;
  medicos:[]=[];
  minDate:Date;
  maxDate:Date;
  startDate = new Date(now());
  constructor(private fb:FormBuilder,public dialogRef:MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, private recepcionista:RecepcionistaService) { 
    
      const currentYear = new Date().getFullYear();
      console.log(currentYear);
      this.minDate = new Date(now())
      this.maxDate = new Date(currentYear+1,11,31)
    }

  ngOnInit(): void {
    this.formDispo();
    this.verMedicos();
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

  formDispo(){
    this.dispoGroup = this.fb.group({
      medico:['',Validators.required],
      horaInicio:['',Validators.required],
      horaFinal:['',Validators.required],
    })
  }
}
