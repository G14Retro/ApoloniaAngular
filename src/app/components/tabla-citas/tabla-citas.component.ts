import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RecepcionistaService } from 'src/app/services/recepcionista.service';
import Swal from 'sweetalert2';
import { CrearCitaComponent } from './crear-cita/crear-cita.component';
import { EditarCitaComponent } from './editar-cita/editar-cita.component';

@Component({
  selector: 'app-tabla-citas',
  templateUrl: './tabla-citas.component.html',
  styleUrls: ['./tabla-citas.component.css']
})
export class TablaCitasComponent implements OnInit, AfterViewInit {

  columns:string[] =
  [
    'medico',
    'consulta',
    'fechaInicio',
    'estado',
    'acciones'
  ];

  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(private recepcion:RecepcionistaService,
    private dialogo:MatDialog){

    }

  ngOnInit(): void {
    this.llenarTablacitas();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel="Registros por página";
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
        this.recepcion.eliminarDispo(id).subscribe((resp:any)=>{
          Swal.fire('Realizado',resp,'success');
          this.ngOnInit();
        })
      }
    })
  }

  llenarTablacitas(){
    this.recepcion.leerCitas().subscribe((resp:any)=>{
      this.dataSource.data = resp;
    })
  }

  dialog(id:string){
    const dialogoRef = this.dialogo.open(EditarCitaComponent ,{
      width:'500px',
      data:{id}
    })
    dialogoRef.afterClosed().subscribe(result =>{
      this.llenarTablacitas();
    })
  }
  Adddialog(){
    const dialogoRef = this.dialogo.open(CrearCitaComponent,{
      width:'500px',
    })
    dialogoRef.afterClosed().subscribe(result =>{
      this.llenarTablacitas();
    })
  }
}
