import {AdministratorService} from 'src/app/services/administrator.service';
import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {
  columns:string[]=['tipo_documento'];
  dataSource = new MatTableDataSource();
  loading:boolean;
    @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(private administratorService: AdministratorService) { }

  ngOnInit(): void {
    this.loading = true;
    this.administratorService.query().subscribe((resp:any)=>{
      this.dataSource = resp;
      this.loading = false
    });
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

}
