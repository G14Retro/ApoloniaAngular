import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SuperficieComponent } from 'src/app/pages/diagnostico/superficie/superficie.component';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-editar-diagnostico',
  templateUrl: './editar-diagnostico.component.html',
  styleUrls: ['./editar-diagnostico.component.css']
})
export class EditarDiagnosticoComponent implements OnInit {
  diagnosticoForm:FormGroup;
  odontoID:string;
  dientes:[] = [];
  sintomas:[] = [];
  tratamientos:[] = [];
  constructor(private fb:FormBuilder, private moneda:CurrencyPipe, private dialog:MatDialog,
              private doctor:DoctorService,private ruta:ActivatedRoute) { }
  total:number;
  ngOnInit(): void {
    this.ruta.params.subscribe(params=>{
      this.odontoID = params['id'];
    });
    this.getDientes();
    this.getSintomas();
    this.getTratamientos();
    this.createForm();
  }


  createForm(){
    this.diagnosticoForm = this.fb.group({
      diagnostico: this.fb.array([this.fb.group({
        diente:'',
        superficie:{valude:'',disabled: true},
        sintomas: '',
        observacion: '',
        tratamiento: '',
        valor_tratamiento:''
      })]),
      valor_total: '',
    })
  }

  get getDiagnosticos(){
    return this.diagnosticoForm.get('diagnostico') as FormArray;
  }


  valor(valor:string,indice:number){
    const diagnostico = <FormArray>this.diagnosticoForm.controls['diagnostico'];
    diagnostico.controls[indice].get('valor_tratamiento').setValue(valor)
  }

  valorTotal(){
    this.total = 0;
    const diagnostico = <FormArray>this.diagnosticoForm.controls['diagnostico'];
    diagnostico.controls.forEach(control=>{
      this.total = this.total + Number(control.get('valor_tratamiento').value)
    })
    this.diagnosticoForm.controls.valor_total.disable();
    this.diagnosticoForm.controls.valor_total.setValue(this.moneda.transform(this.total));
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


}
