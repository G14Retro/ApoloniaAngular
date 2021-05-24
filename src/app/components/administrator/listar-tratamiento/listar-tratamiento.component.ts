import {AdministratorService} from 'src/app/services/administrator.service';
import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-tratamiento',
  templateUrl: './listar-tratamiento.component.html',
  styleUrls: ['./listar-tratamiento.component.css']
})
export class ListarTratamientoComponent implements OnInit,AfterViewInit {
  columns:string[]=['nombre_tratamiento', 'valor_tratamiento','Acciones'];
  dataSource = new MatTableDataSource();
  loading:boolean;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(private administratorService: AdministratorService) { }

  ngOnInit(): void {
    
   this.listarTratamientos();
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  listarTratamientos(){
    this.loading = true;
    this.administratorService.listarTratamientos().subscribe((resp:any)=>{
      console.log (resp);
      this.dataSource.data = resp;
      this.loading = false
    })
  }
  elimiarTratamiento(id:string){
    Swal.fire({
      title:'¿Desea eliminar esta disponibilidad?',
      icon: 'warning',
      showCancelButton:true,
      confirmButtonText: `Confirmar`,
      cancelButtonText: `Cancelar`,
    }).then((result)=>{
      if (result.isConfirmed) {
        this.administratorService.elimiarTratamiento(id).subscribe((resp:any)=>{
          Swal.fire('Realizado',resp,'success');
          this.ngOnInit();
        })
      }
    })
  }

}
