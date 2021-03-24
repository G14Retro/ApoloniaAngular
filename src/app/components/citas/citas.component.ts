import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { dispoModel } from 'src/app/models/dispo.model';
import { CitasService } from 'src/app/services/citas.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styles: [
    'table {width:100%;}'
  ]
})

export class CitasComponent implements OnInit, AfterViewInit {
  columns : string[]=['fechaIni', 'fechaFin', 'nMedico', 'aMedico', 'especialidad', 'consultorio','Id'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator:MatPaginator;
  constructor(private citas:CitasService){

  }
   ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.citas.getDispo().subscribe((resp:any)=>{
      this.dataSource.data = resp;
      });
  }
  agendar (id_dispo:string){    
    Swal.fire({
      title:'Confirma agendar la cita', 
      showCancelButton:true, 
      confirmButtonText: `Confirmar`,
      cancelButtonText: `Cancelar`,
    }).then ((result)=>{
      
      if (result.isConfirmed) {
        this.citas.agendarCita(id_dispo).subscribe(resp=>{
          Swal.fire ('Guardado', '', 'success');
          this.ngOnInit();
          
        })
        
      }
      
    })

  }
}
