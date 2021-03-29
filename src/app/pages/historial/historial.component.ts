import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import { CitasService } from 'src/app/services/citas.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styles: ['table {width:100%;}'
  ]
})
export class HistorialComponent implements OnInit, AfterViewInit {
  columns:string[]=['fecha_inicio','fecha_fin','estado','fecha_asignacion'];
  dataSoruce = new MatTableDataSource();
  loading:boolean;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  constructor(private cita:CitasService,private auth:AuthService) { }

  ngOnInit(): void {
    this.loading = true;
    this.cita.getHistorial(this.auth.usuario.id).subscribe((resp:any)=>{
      this.dataSoruce = resp;
      this.loading = false
    });
  }
  ngAfterViewInit(){
    this.dataSoruce.paginator = this.paginator;
  }
}
