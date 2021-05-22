import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorService } from 'src/app/services/doctor.service';
import { TablaDiagnosticoComponent } from '../tabla-diagnostico/tabla-diagnostico.component';
import { TablaOdontogramaComponent } from '../tabla-odontograma/tabla-odontograma.component';

@Component({
  selector: 'app-tabla-pacientes',
  templateUrl: './tabla-pacientes.component.html',
  styleUrls: ['./tabla-pacientes.component.css']
})
export class TablaPacientesComponent implements OnInit,AfterViewInit {
  loading:boolean = false;
  columns:string[]=['nombre_paciente','apellido_paciente','n_documento','acciones'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator:MatPaginator;
  constructor(private doctor:DoctorService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.llenarTabla();
  }

  ngAfterViewInit():void{
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel="Registros por página";
    this.filtrarPaciente();
  }

  llenarTabla(){
    this.loading = true;
    this.doctor.getPacientes().subscribe((resp:any)=>{
      this.dataSource.data = resp;
      this.loading = false;
    })
  }

  filtrarPaciente(){
    let paciente = sessionStorage.getItem('paciente');
    if (paciente != null) {
      this.applyFilter(paciente);
      sessionStorage.removeItem('paciente');
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  odontoDialog(id:string){
    const dialogRef = this.dialog.open(TablaOdontogramaComponent,{
      width:'800px',
      data:{id}
    })
  }

  diagnosticoDialog(id:string){
    const dialogRef = this.dialog.open(TablaDiagnosticoComponent,{
      width: '800px',
      data: {id}
    })
  }
}
