import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styles: [
  ]
})
export class ConfirmacionComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  

  ngOnInit(): void {
  }

}
