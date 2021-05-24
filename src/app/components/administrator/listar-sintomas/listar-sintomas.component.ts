import {AdministratorService} from 'src/app/services/administrator.service';
import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-sintomas',
  templateUrl: './listar-sintomas.component.html',
  styleUrls: ['./listar-sintomas.component.css']
})
export class ListarSintomasComponent implements OnInit {

  columns:string[]=['nombre_sintoma', 'color','Acciones'];
  dataSource = new MatTableDataSource();
  loading:boolean;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(private administratorService: AdministratorService) { }

  ngOnInit(): void {
    this.listarSintomas();
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  listarSintomas(){
    this.loading = true;
    this.administratorService.listarSintomas().subscribe((resp:any)=>{
      console.log (resp);
      this.dataSource.data = resp;
      this.loading = false
    })
  }
  elimiarSintoma(id:string){
    Swal.fire({
      title:'¿Desea eliminar esta disponibilidad?',
      icon: 'warning',
      showCancelButton:true,
      confirmButtonText: `Confirmar`,
      cancelButtonText: `Cancelar`,
    }).then((result)=>{
      if (result.isConfirmed) {
        this.administratorService.elimiarSintoma(id).subscribe((resp:any)=>{
          Swal.fire('Realizado',resp,'success');
          this.ngOnInit();
        })
      }
    })
  }

}
