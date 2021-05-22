import { CurrencyPipe } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import Swal from 'sweetalert2';
import { SuperficieComponent } from './superficie/superficie.component';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.css']
})
export class DiagnosticoComponent implements OnInit, DoCheck {
  diagnosticoForm:FormGroup;
  odontoID:String;
  dientes:[] = [];
  sintomas:[] = [];
  tratamientos:[] = [];
  abierto:boolean = false;
  seleccion:String;
  total:number;
  constructor(private fb:FormBuilder, private ruta:ActivatedRoute, private doctor:DoctorService,
              private dialog:MatDialog, private moneda:CurrencyPipe, private router:Router) { }

  ngOnInit(): void {
    this.ruta.params.subscribe(params=>{
      this.odontoID = params['id'];
    });
    this.getDientes();
    this.getSintomas();
    this.getTratamientos();
    this.createForm();
  }

  ngDoCheck(){
    this.valorTotal();
  }

  createForm(){
    this.diagnosticoForm = this.fb.group({
      diagnostico: this.fb.array([this.fb.group({
        odontograma:[this.odontoID,Validators.required],
        diente:['',Validators.required],
        superficie: {value:'', disabled: true},
        sintomas:['',Validators.required],
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
        superficie:{value:'', disabled: true},
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
      control.get('superficie').enable()
    })
    if (diagnostico.invalid) {
      return
    }
    Swal.fire({
      title:'¿Desea guardar el diagnostico?',
      icon:'warning',
      showCancelButton:true, 
      confirmButtonText: `Guardar`,
      cancelButtonText: `Cancelar`,
    }).then((result)=>{
      if (result.isConfirmed) {
        Swal.fire({
          allowOutsideClick: false,
          icon:'info',
          title: 'Espere por favor...'
        });
        Swal.showLoading();
        this.doctor.guardarDiagnostico(diagnostico.value).subscribe((resp:any)=>{
          Swal.close();
          Swal.fire ('Guardado', resp.message, 'success');
          this.router.navigateByUrl('/doctor/pacientes/odontograma/'+this.odontoID);
        },(err:any)=>{
          Swal.fire({
            icon: 'error',
            title: 'Error al cancelar',
            text: err.error.message,
          })
        });
      }
    })
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

  
}
