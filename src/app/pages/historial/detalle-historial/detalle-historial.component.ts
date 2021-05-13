import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CitasService } from 'src/app/services/citas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-historial',
  templateUrl: './detalle-historial.component.html',
  styleUrls: ['./detalle-historial.component.css']
})
export class DetalleHistorialComponent implements OnInit {
  dispoForm:FormGroup;
  id_dispo:string;
  id_cita:string;
  constructor(private fb:FormBuilder, private ruta:ActivatedRoute,private citas:CitasService, private title:TitleCasePipe, private router:Router) {
    ruta.params.subscribe(params=>{
      this.id_cita = params['id'];
    })
   }

  ngOnInit(): void {
    this.formDispo();
    this.llenarForm();
  }

  formDispo(){
    this.dispoForm = this.fb.group({
      especialista:[''],
      tipo_consulta:[''],
      consultorio:[''],
      inicio_cita:[''],
      fin_cita:[''],
    })
  }

  llenarForm(){
    this.citas.getDispoID(this.id_cita).subscribe((resp:any)=>{
      this.id_dispo = resp['0'].id_dispo;
      this.dispoForm.setValue({
        especialista: this.title.transform(resp['0'].nombre_medico + ' ' + resp['0'].apellido_medico),
        tipo_consulta: this.title.transform(resp['0'].tipo_consulta),
        consultorio: this.title.transform(resp['0'].consultorio),
        inicio_cita: resp['0'].inicio_cita,
        fin_cita: resp['0'].fin_cita
      })
      this.dispoForm.disable();
    },err=>{
      console.log(err);
    })
  }
  cancelarCita(){

    Swal.fire({
      title:'¿Desea cancelar su cita?',
      icon:'warning',
      showCancelButton:true, 
      confirmButtonText: `Confirmar`,
      cancelButtonText: `Cancelar`,
    }).then ((result)=>{
      
      if (result.isConfirmed) {
        Swal.fire({
          allowOutsideClick: false,
          icon:'info',
          title: 'Espere por favor...'
        });
        Swal.showLoading();
    
        this.citas.cancelarCita(this.id_cita).subscribe((resp:any)=>{
          Swal.close();
          Swal.fire ('Guardado', resp.message, 'success');
          this.router.navigateByUrl('/paciente/historial');
        },err=>{
          Swal.fire({
            icon: 'error',
            title: 'Error al cancelar',
            text: err.error.message,
          })
        })
      }
      
    })

  }
}
