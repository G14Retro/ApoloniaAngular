import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { antecedenteModel } from 'src/app/models/antecedente.model';
import { DoctorService } from 'src/app/services/doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paciente-antecedente',
  templateUrl: './paciente-antecedente.component.html',
  styleUrls: ['./paciente-antecedente.component.css']
})
export class PacienteAntecedenteComponent implements OnInit {
  datos:antecedenteModel;
  personalForm:FormGroup;
  antecedenteForm:FormGroup;
  loading:boolean;
  constructor(private doctorService:DoctorService, private ruta:ActivatedRoute, 
    private fb:FormBuilder, private router:Router) { 
      this.createForm();
    }
    
    
    ngOnInit(): void {
    this.datos= new antecedenteModel;
    this.llamarDatos();
  }

  guardarAntecedente(){
    Swal.fire({
      title:'¿Desea guardar?',
      icon:'warning',
      showCancelButton:true, 
      cancelButtonText: `Cancelar`,
      confirmButtonText: `Confirmar`,
    }).then((result)=>{
      if (result.isConfirmed) {       
        Swal.fire({
          allowOutsideClick: false,
          icon:'info',
          title: 'Espere por favor...'
        });
        Swal.showLoading();
        this.ruta.params.subscribe(params=>{
          this.antecedenteForm.controls['paciente'].setValue(params['id']);
          this.doctorService.guardarAtecedenteId(this.antecedenteForm).subscribe((resp:any)=>{
            Swal.close();
            Swal.fire('Guardado',resp.message,'success');
            this.router.navigateByUrl('/doctor/pacientes');
          },err=>{
            Swal.fire({
              icon: 'error',
              title: 'Error al cancelar',
              text: err.error.message,
            });
          })
        });
      }
    })
  }

  llamarDatos(){
    this.ruta.params.subscribe(params=>{
      this.doctorService.getAntecedenteId(params['id']).subscribe((resp:any)=>{
        this.datos = resp;
        this.personalForm.setValue(this.datos.paciente[0]);
        this.personalForm.disable();
        this.antecedenteForm.setValue(this.datos.antecedente[0]);
      });
    });
   }

  createForm(){
    this.personalForm = this.fb.group({
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
      paciente:[''],
    })
   }

}
