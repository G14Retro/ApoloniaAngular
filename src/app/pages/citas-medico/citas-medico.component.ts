import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-citas-medico',
  templateUrl: './citas-medico.component.html',
  styleUrls: ['./citas-medico.component.css']
})
export class CitasMedicoComponent implements OnInit,AfterViewInit {
  columns:string[]=['nombre_paciente','apellido_paciente','hora_atencion','acciones'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator:MatPaginator;
  constructor(private doctorService:DoctorService) { }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.doctorService.obtenerAgenda().subscribe((resp:any)=>{
      console.log(resp);
      this.dataSource = resp;
    });
  }
  accionCita(id_paciente:String,accion:String){
      console.log(id_paciente);
      console.log(accion);
  }
}
