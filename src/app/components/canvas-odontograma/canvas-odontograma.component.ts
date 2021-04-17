import { AfterViewInit, Component, OnChanges, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas-odontograma',
  templateUrl: './canvas-odontograma.component.html',
  styleUrls: ['./canvas-odontograma.component.css']
})
export class CanvasOdontogramaComponent implements OnInit,AfterViewInit,OnChanges {
  fillColor:String = 'white';
  fill;
  htmlString:string;
  nativo:any;
  @ViewChild('odontograma') odontograma;
  constructor() {

  }

  ngOnInit(): void {
    
  }
  
  ngAfterViewInit(){

  }

  ngOnChanges(){
    console.log("Cambios");
    console.log(this.nativo);
  }

  changeColor(lado:SVGElement) {
    console.log("Cambiando");
    this.fill = this.fillColor
    lado.attributes.setNamedItem(lado.attributes.getNamedItem('fill')).value = this.fill;
  }

  amarillo(){
    this.fillColor ='yellow'
  }

  rojo(){
    this.fillColor ='red'
  }

  guardarOdonto(){
    // this.htmlString = odonto.innerHTML;
    this.nativo = this.odontograma.nativeElement;
    localStorage.setItem('html',this.nativo.toString())
  }
  cargarOdonto(){
    this.odontograma.nativeElement = this.nativo;
    console.log(this.nativo);
  }

}
