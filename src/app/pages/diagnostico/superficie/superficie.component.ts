import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-superficie',
  templateUrl: './superficie.component.html',
  styleUrls: ['./superficie.component.css']
})
export class SuperficieComponent implements OnInit {
  superficies:any[] = [
    {valor: 'M', nombre: 'Mesial'},
    {valor: 'D', nombre: 'Distal'},
    {valor: 'V', nombre: 'Vestibular'},
    {valor: 'P', nombre: 'Palatina'},
    {valor: 'O', nombre: 'Oclusal'},
    {valor: 'ausente', nombre: 'Ausente'},
  ];
  @ViewChild('superficieL') superficieL;
  constructor(public dialogRef: MatDialogRef<SuperficieComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

guardar(){
  this.dialogRef.close(this.superficieL)
}

}
