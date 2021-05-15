import {AdministratorService} from 'src/app/services/administrator.service';
import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit,AfterViewInit {
  columns:string[]=['tipo_documento', 'numero_documento','nombre','apellido','direccion','ciudad',
  'telefono','correo','genero','fecha_nacimiento','tipo_usuario','estado','Acciones'];
  dataSource = new MatTableDataSource();
  loading:boolean;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  constructor(private administratorService: AdministratorService) { }

  ngOnInit(): void {
    this.loading = true;
    this.administratorService.query().subscribe((resp:any)=>{
      this.dataSource.data = resp;
      this.loading = false
    });
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
