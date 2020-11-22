import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CitasService } from 'src/app/services/citas.service';

export interface Dispo {
  fechaIni: Date;
  fechaFin:Date;
  nombre:string;
  apellido:string;
  especialidad:string;
  consultorio:string;
}

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styles: [
    '.table {weight:100%;}'
  ]
})

export class CitasComponent implements OnInit, AfterViewInit {
  arrayDispo:Dispo[]=[];
  @ViewChild(MatPaginator) paginator:MatPaginator;
  data:any;
  columns : string[]=['Fecha de Inicio', 'Fecha fin', 'Nombre Medico', 'Apellido', 'Especialidad', 'Consultorio'];
  constructor(private citas:CitasService){
    citas.getDispo().subscribe((resp:any)=>{
    this.arrayDispo=resp;
    this.data=new MatTableDataSource<Dispo>(this.arrayDispo);
    });
   }
   ngAfterViewInit(){
    this.data.paginator=this.paginator;
   }
  ngOnInit(): void {
  }

}
