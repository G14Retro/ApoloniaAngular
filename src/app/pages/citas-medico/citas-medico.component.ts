import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';

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
  constructor(private administratorService:DoctorService, private router:Router) { }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel="Registros por página";
  }

  ngOnInit(): void {
    this.loading = true;
    this.administratorService.obtenerAgenda().subscribe((resp:any)=>{
      if (resp.message) {
        this.dataSource = new MatTableDataSource();
      } else {
        this.dataSource.data = resp;
      }
      this.loading = false;
    });
  }

}
