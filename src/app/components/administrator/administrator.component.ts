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
  public administrator: any;

  constructor(private administratorService: AdministratorService) { }

  ngOnInit(): void {
    this.administratorService.query()
    .subscribe(res=> {
      console.log("En ADMINISRTATOR LIST",res);
      this.administrator = res;
    })
  }

}
