import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-citas-medico',
  templateUrl: './citas-medico.component.html',
  styleUrls: ['./citas-medico.component.css']
})
export class CitasMedicoComponent implements OnInit,AfterViewInit {
  columns:string[]=['nombre_paciente','apellido_paciente','hora_atencion','acciones'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator:MatPaginator;
  constructor(private doctorService:DoctorService, private router:Router) { }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.doctorService.obtenerAgenda().subscribe((resp:any)=>{
      this.dataSource = resp;
    });
  }

  verAntecedente(id_paciente:String){
    this.doctorService.obtenerAntecedente(id_paciente).subscribe((resp:Object)=>{
      console.log(resp);
      if (resp.valueOf.length==0) {
        console.log("Se debe crear el antecedente");
        this.router.navigateByUrl('/doctor/antecedente/'+id_paciente);
      }else{
        console.log("Cargue los datos");
      }
    });
  }
}
