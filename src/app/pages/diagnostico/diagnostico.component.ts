import { Component, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import { SuperficieComponent } from './superficie/superficie.component';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.css']
})
export class DiagnosticoComponent implements OnInit, OnChanges {
  diagnosticoForm:FormGroup;
  odontoID:String;
  dientes:[] = [];
  sintomas:[] = [];
  tratamientos:[] = [];
  abierto:boolean = false;
  seleccion:String;
  total = 0;
  constructor(private fb:FormBuilder, private ruta:ActivatedRoute, private doctor:DoctorService,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    this.ruta.params.subscribe(params=>{
      this.odontoID = params['id'];
    });
    this.getDientes();
    this.getSintomas();
    this.getTratamientos();
    this.createForm();
  }

  ngOnChanges(){
    this.valorTotal();
  }

  createForm(){
    this.diagnosticoForm = this.fb.group({
      diagnostico: this.fb.array([this.fb.group({
        odontograma:[this.odontoID,Validators.required],
        diente:['',Validators.required],
        superficie:['',Validators.required],
        sintomas:[''],
        observacion:['',Validators.required],
        tratamiento:['',Validators.required],
        valor_tratamiento:['',Validators.required],
      })]),
      valor_total:'',
    });
  }

  getDientes(){
    this.doctor.getDientes().subscribe((resp:any)=>{
      this.dientes = resp
    })
  }

  getSintomas(){
    this.doctor.getSintomas().subscribe((resp:any)=>{
      this.sintomas = resp
    })
  }

  getTratamientos(){
    this.doctor.getTratamientos().subscribe((resp:any)=>{
      this.tratamientos = resp
    })
  }


  valor(valor:string,indice:number){
    const diagnostico = <FormArray>this.diagnosticoForm.controls['diagnostico'];
    diagnostico.controls[indice].get('valor_tratamiento').setValue(valor)
    this.total = this.total + diagnostico.controls[indice].get('valor_tratamiento').value;
  }

  get getDiagnosticos(){
    return this.diagnosticoForm.get('diagnostico') as FormArray;
  }

  openSuperficie(indice:number){
    const dialogRef = this.dialog.open(SuperficieComponent,{
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(result=>{
      const diagnostico = <FormArray>this.diagnosticoForm.controls['diagnostico'];
      diagnostico.controls[indice].get('superficie').setValue(result._value)
    })
  }

  agregarRegistro(){
    const diagnostico = <FormArray>this.diagnosticoForm.controls['diagnostico'];
    diagnostico.push(this.fb.group({
      odontograma:[this.odontoID,Validators.required],
        diente:['',Validators.required],
        superficie:[''],
        sintomas:['',Validators.required],
        observacion:['',Validators.required],
        tratamiento:['',Validators.required],
        valor_tratamiento:['',Validators.required],
    }))
  }

  removerRegistro(index:number){
    const diagnostico = <FormArray>this.diagnosticoForm.controls['diagnostico'];
    diagnostico.removeAt(index); 
  }

  guardar(){
    const diagnostico = <FormArray>this.diagnosticoForm.controls['diagnostico'];
    diagnostico.controls.forEach(control=>{
      control.get('superficie').setValue(control.get('superficie').value.toString())
    })

    this.doctor.guardarDiagnostico(diagnostico.value).subscribe((resp:any)=>{
      console.log(resp);
    },(err:any)=>{
      console.log(err);
    });
  }

valorTotal(){
  console.log("Pasando total");
}

}
