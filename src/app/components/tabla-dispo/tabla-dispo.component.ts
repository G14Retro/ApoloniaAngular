import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { RecepcionistaService } from 'src/app/services/recepcionista.service';

@Component({
  selector: 'app-tabla-dispo',
  templateUrl: './tabla-dispo.component.html',
  styleUrls: ['./tabla-dispo.component.css']
})
export class TablaDispoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[]= ['nombre_medico', 'apellido_medico', 'hora_inicio', 'hora_fin', 'consulta', 'consultorio', 'disponibilidad', 'acciones'];
  dataSource = new MatTableDataSource ();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private recepcionista:RecepcionistaService){}

  ngOnInit(): void {
    this.cargarTabla();
  }
  
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarTabla(){
    this.recepcionista.listarDispo().subscribe((resp:any)=>{
      this.dataSource = resp;
    })
  }

}
