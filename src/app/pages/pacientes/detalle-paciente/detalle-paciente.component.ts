import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-detalle-paciente',
  templateUrl: './detalle-paciente.component.html',
  styleUrls: ['./detalle-paciente.component.css']
})
export class DetallePacienteComponent implements OnInit {
  pacienteGroup:FormGroup;
  constructor(private doctor:DoctorService, private ruta:ActivatedRoute, private fb:FormBuilder) { 
    this.pacienteGroup = fb.group({
      tipo_documento:'',
      numero_documento:'',
      nombre:'',
      apellido:'',
      direccion:'',
      ciudad:'',
      telefono:'',
      correo:'',
    });
  }

  ngOnInit(): void {
    this.datos();
  }

  datos(){
    this.ruta.params.subscribe(params=>{
      this.doctor.getPacienteID(params['id']).subscribe(resp=>{
        this.pacienteGroup.setValue(resp['0']);
        this.pacienteGroup.disable();
      })
    })
  }

}
