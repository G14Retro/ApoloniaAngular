import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-tabla-odontograma',
  templateUrl: './tabla-odontograma.component.html',
  styleUrls: ['./tabla-odontograma.component.css']
})
export class TablaOdontogramaComponent implements OnInit,AfterViewInit {
  loading:boolean = false;
  columns:string[]=['id','ficha','fecha_creacion','acciones'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator:MatPaginator;
  constructor(public dialogRef:MatDialogRef<TablaOdontogramaComponent>,@Inject(MAT_DIALOG_DATA) public data:any,
              private doctor:DoctorService, private router:Router) { }

  ngOnInit(): void {
    this.llenarTabla();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  llenarTabla(){
    this.loading = true;
    this.doctor.getOdontos(this.data.id).subscribe((resp:any)=>{
      this.dataSource.data = resp;
      this.loading = false;
    })
  }

  verOdonto(id:String){
    this.dialogRef.close(this.router.navigateByUrl('/doctor/pacientes/odontograma/'+id));
  }
}
