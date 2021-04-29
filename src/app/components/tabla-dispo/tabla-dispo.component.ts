import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RecepcionistaService } from 'src/app/services/recepcionista.service';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { stringify } from '@angular/compiler/src/util';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-dispo',
  templateUrl: './tabla-dispo.component.html',
  styleUrls: ['./tabla-dispo.component.css']
})
export class TablaDispoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] =
  [
    'medico',
    'hora_inicio',
    'hora_fin',
    'consulta',
    'consultorio',
    'disponibilidad',
    'acciones'
  ];

  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private recepcionista:RecepcionistaService, private dialogo:MatDialog){

  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel="Registros por página";
  }

  ngOnInit(){
    this.cargarTabla();
  }

  destroy(id:string){
    Swal.fire({
      title:'¿Desea eliminar esta disponibilidad?',
      icon: 'warning',
      showCancelButton:true,
      confirmButtonText: `Confirmar`,
      cancelButtonText: `Cancelar`,
    }).then((result)=>{
      if (result.isConfirmed) {
        this.recepcionista.eliminarDispo(id).subscribe((resp:any)=>{
          Swal.fire('Realizado',resp,'success');
          this.ngOnInit();
        })
      }
    })
  }

  cargarTabla(){
    this.recepcionista.listarDispo().subscribe((resp:any)=>{
      if (resp.message) {
        this.dataSource = new MatTableDataSource();
      }else{
        this.dataSource.data = resp;
      }
    });
  }
  dialog(id:string){
    const dialogoRef = this.dialogo.open(EditDialogComponent ,{
      width:'500px',
      data:{id}
    })
    dialogoRef.afterClosed().subscribe(result =>{
      this.cargarTabla();
    })
  }
  Adddialog(){
    const dialogoRef = this.dialogo.open(AddDialogComponent,{
      width:'500px',
    })
    dialogoRef.afterClosed().subscribe(result =>{
      this.cargarTabla();
    })
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
