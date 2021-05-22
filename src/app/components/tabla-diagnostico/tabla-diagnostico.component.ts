import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-tabla-diagnostico',
  templateUrl: './tabla-diagnostico.component.html',
  styleUrls: ['./tabla-diagnostico.component.css']
})
export class TablaDiagnosticoComponent implements OnInit, AfterViewInit {
  loading:boolean = false;
  columns:string[]=['id','fecha_creacion','acciones'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator:MatPaginator;
  constructor(public dialogRef:MatDialogRef<TablaDiagnosticoComponent>,@Inject(MAT_DIALOG_DATA) public data:any,
  private doctor:DoctorService, private router:Router) { }

  ngOnInit(): void {
    this.llenarTabla();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  llenarTabla(){
    this.loading = true;
    this.doctor.getDiagnosticos(this.data.id).subscribe((resp:any)=>{
      this.dataSource.data = resp;
      this.loading = false;
    })
  }

  nuevoDiagnostico(){
    this.doctor.nuevoDiagnostico(this.data.id).subscribe((resp:any[])=>{
      this.dialogRef.close(this.router.navigateByUrl('/doctor/pacientes/diagnostico/'+resp))
    })
  }

  verDiagnostico(id:string){
    this.dialogRef.close(this.router.navigateByUrl('/doctor/pacientes/editar-diagnostico/'+id))
  }

}
