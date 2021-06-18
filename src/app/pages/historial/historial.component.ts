import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { CitasService } from 'src/app/services/citas.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit, AfterViewInit {
  columns:string[]=['fecha_inicio','fecha_fin','estado','fecha_asignacion','acciones'];
  dataSource = new MatTableDataSource();
  loading:boolean;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  constructor(private cita:CitasService,private auth:AuthService) { }

  ngOnInit(): void {
    this.verHistorial()
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel="Registros por página";
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  verHistorial(){
    this.loading = true;
    this.cita.getHistorial(this.auth.usuario.id).subscribe((resp:any)=>{
      if (resp.Message) {
        this.dataSource = new MatTableDataSource();
      } else {
        this.dataSource.data = resp;
      }
      this.loading = false
    });
  }
}
