import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { antecedenteModel } from 'src/app/models/antecedente.model';
import { userModel } from 'src/app/models/user.model';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-antecedente',
  templateUrl: './antecedente.component.html',
  styleUrls: ['./antecedente.component.css']
})
export class AntecedenteComponent implements OnInit {
  datos:antecedenteModel;
  constructor(private doctorService:DoctorService, private ruta:ActivatedRoute) { }

  ngOnInit(): void {
    this.ruta.params.subscribe(params=>{
      this.doctorService.obtenerAntecedente(params['id']).subscribe((resp:any)=>{
        this.datos = resp;
        this.datos.paciente = this.datos.paciente['0']
        console.log(this.datos.paciente.tipo_documento);
      });
    });
   }
  }

