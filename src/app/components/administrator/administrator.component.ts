import {AdministratorService} from 'src/app/services/administrator.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';





@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit,AfterViewInit {
  columns:string[]=['tipo_documento'];
  dataSource = new MatTableDataSource();
  loading:boolean;
    @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(private administratorService: AdministratorService) { }

  ngOnInit(): void {
    this.loading = true;
    this.administratorService.query().subscribe((resp:any)=>{
      this.dataSource = resp;
      console.log(this.dataSource);
      this.loading = false
    });
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

}
