import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { dispoModel } from 'src/app/models/dispo.model';
import { CitasService } from 'src/app/services/citas.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styles: [
    'table {width:100%;}'
  ]
})

export class CitasComponent implements OnInit, AfterViewInit {
  arrayDispo:dispoModel;
  columns : string[]=['fechaIni', 'fechaFin', 'nMedico', 'aMedico', 'especialidad', 'consultorio','acciones'];
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
      this.arrayDispo = resp;
      console.log(this.arrayDispo.nMedico);
      });
  }
}
