import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { RecepcionistaService } from 'src/app/services/recepcionista.service';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
  selector: 'app-tabla-dispo',
  templateUrl: './tabla-dispo.component.html',
  styleUrls: ['./tabla-dispo.component.css']
})
export class TablaDispoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[]= ['medico', 'hora_inicio', 'hora_fin', 'consulta', 'consultorio', 'disponibilidad', 'acciones'];
  dataSource = new MatTableDataSource ();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private recepcionista:RecepcionistaService, private dialogo:MatDialog){}

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
      if (resp.message) {
        this.dataSource = new MatTableDataSource();
      }else{
        this.dataSource = resp;
      }
      
    })
  }

  dialog(){
    this.dialogo.open(EditDialogComponent ,{
      width:'500px',
    })
  }

  Adddialog(){
    this.dialogo.open(AddDialogComponent,{
      width:'500px',
    })
  }

}
