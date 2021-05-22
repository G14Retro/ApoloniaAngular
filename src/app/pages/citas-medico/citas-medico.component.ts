import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-citas-medico',
  templateUrl: './citas-medico.component.html',
  styleUrls: ['./citas-medico.component.css']
})
export class CitasMedicoComponent implements OnInit,AfterViewInit {
  columns:string[]=['nombre_paciente','apellido_paciente','hora_atencion','acciones'];
  dataSource = new MatTableDataSource();
  loading:boolean;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  constructor(private doctor:DoctorService, private router:Router) { }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel="Registros por página";
  }

  ngOnInit(): void {
    this.loading = true;
    this.doctor.obtenerAgenda().subscribe((resp:any)=>{
      if (resp.message) {
        this.dataSource = new MatTableDataSource();
      } else {
        this.dataSource.data = resp;
      }
      this.loading = false;
    });
  }

  asistencia(){
    Swal.fire({
      title:'¿Desea confirmar la asistencia del paciente?',
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
        this.doctor.asistencia(this.dataSource.data[0]['id'])
        .subscribe((resp:any)=>{
          Swal.close();
          Swal.fire ('Guardado', resp.message, 'success');
          sessionStorage.setItem('paciente',this.dataSource.data[0]['id_paciente']);
          this.router.navigateByUrl('/doctor/pacientes');
        },(err:any)=>{
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Error al guardar',
            text: err.error.message,
          });
        }
        )
      }
    });

  }

}
