import { CurrencyPipe } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperficieComponent } from 'src/app/pages/diagnostico/superficie/superficie.component';
import { DoctorService } from 'src/app/services/doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-diagnostico',
  templateUrl: './editar-diagnostico.component.html',
  styleUrls: ['./editar-diagnostico.component.css']
})
export class EditarDiagnosticoComponent implements OnInit, DoCheck {
  diagnosticoForm:FormGroup;
  odontoID:string;
  dientes:[] = [];
  sintomas:[] = [];
  tratamientos:[] = [];
  loading:boolean = false;
  constructor(private fb:FormBuilder, private moneda:CurrencyPipe, private dialog:MatDialog,
              private doctor:DoctorService,private ruta:ActivatedRoute,private router:Router) { }
  total:number;
  ngOnInit(): void {
    this.ruta.params.subscribe(params=>{
      this.odontoID = params['id'];
    });
    this.getDientes();
    this.getSintomas();
    this.getTratamientos();
    this.createForm();
    this.getDiagnostico();
  }

  ngDoCheck(){
    this.valorTotal();
  }

  createForm(){
    this.diagnosticoForm = this.fb.group({
      diagnostico: this.fb.array([this.fb.group({
        id:'',
        odontograma: this.odontoID,
        diente:'',
        superficie: {value:'', disabled: true},
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

  getDiagnostico(){
    this.loading = true;
    const diagnostico = <FormArray>this.diagnosticoForm.controls['diagnostico'];
    this.doctor.getDiagnosticoId(this.odontoID).subscribe((resp:any[])=>{
      for (let index = 0; index < resp.length -1; index++) {
        diagnostico.push(this.fb.group({
          id:'',
        odontograma: this.odontoID,
        diente:'',
        superficie: {value:'', disabled: true},
        sintomas: '',
        observacion: '',
        tratamiento: '',
        valor_tratamiento:''
        }))
      }
     diagnostico.setValue(resp);
     this.loading = false;
    })
  }

guardar(){
  const diagnostico = <FormArray>this.diagnosticoForm.controls['diagnostico'];
  diagnostico.controls.forEach(control=>{
    control.get('superficie').setValue(control.get('superficie').value.toString())
    control.get('superficie').enable()
  });
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
      this.doctor.editDiagnostico(diagnostico).subscribe((resp:any)=>{
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

}
