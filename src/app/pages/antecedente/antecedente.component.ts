import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { antecedenteModel } from 'src/app/models/antecedente.model';
import { userModel } from 'src/app/models/user.model';
import { DoctorService } from 'src/app/services/doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-antecedente',
  templateUrl: './antecedente.component.html',
  styleUrls: ['./antecedente.component.css']
})
export class AntecedenteComponent implements OnInit {
  datos:antecedenteModel;
  personalForm:FormGroup;
  antecedenteForm:FormGroup;
  loading:boolean;
  constructor(private doctorService:DoctorService, private ruta:ActivatedRoute, 
    private fb:FormBuilder, private route:Router) { 
    this.loading = true;
    this.datos= new antecedenteModel;
    this.createForm();
  }

  ngOnInit(): void {
    this.llamarDatos();
   }

   createForm(){
    this.personalForm = this.fb.group({
      id: [''],
      tipo_documento: [''],
      numero_documento:[''],
      nombre:[''],
      apellido:[''],
    })
    this.antecedenteForm = this.fb.group({
      alergias:['',Validators.required],
      enfermedades:['',Validators.required],
      enfermedades_familiares:['',Validators.required],
      cirugias:['',Validators.required],
      medicamentos:['',Validators.required],
      otros:['',Validators.required],
      cita:[''],
      paciente:[''],
    })
   }

   guardarAntecedente(){
    Swal.fire({
      allowOutsideClick: false,
      icon:'info',
      title: 'Espere por favor...'
    });
    Swal.showLoading();
    this.ruta.params.subscribe(params=>{
      this.antecedenteForm.controls['cita'].setValue(params['id']);
     this.doctorService.guardarAntecedente(this.antecedenteForm).subscribe((resp:any)=>{
      this.doctorService.fichaDental = resp.ficha;
       Swal.close();
       Swal.fire (resp['message'], '', 'success');
      this.route.navigateByUrl('/doctor/pacientes/odontograma/'+this.doctorService.fichaDental);
     });
    }, 
    (err)=>{
      Swal.fire({
        icon: 'error',
        title: 'Error al guardar antecedente',
        text: err,
      })});

   }
   llamarDatos(){
    this.ruta.params.subscribe(params=>{
      this.doctorService.obtenerAntecedente(params['id']).subscribe((resp:any)=>{
        this.datos = resp;
        this.datos.paciente = this.datos.paciente['0'];
        this.datos.antecedente = this.datos.antecedente['0'];
        this.datos.antecedente.cita = '';
        this.personalForm.setValue(this.datos.paciente);
        this.personalForm.disable();
        this.loading = false;
        this.antecedenteForm.setValue(this.datos.antecedente);
      });
    });
   }
  }

