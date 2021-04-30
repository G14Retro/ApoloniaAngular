import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas-odontograma',
  templateUrl: './canvas-odontograma.component.html',
  styleUrls: ['./canvas-odontograma.component.css']
})
export class CanvasOdontogramaComponent implements OnInit,AfterViewInit {
  fillColor:String = 'white';
  fill;
  htmlString:string;
  nativo:any;
  @ViewChild('odontograma') odonto:ElementRef<HTMLCanvasElement>;
  @HostListener('document:click',['$event']) 
  mouseClick = (e:any)=>{
    if (e.target.id=== 'odontograma') {
      console.log(e);
    }
  }
  public context:CanvasRenderingContext2D;
  constructor() {

  }

  ngOnInit(): void {
    
  }
  
  ngAfterViewInit():void{
    this.context = this.odonto.nativeElement.getContext('2d');
    console.log(this.context);
  }

  changeColor(lado:SVGElement) {
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

    console.log(this.nativo);
    localStorage.setItem('html',this.nativo)
  }
  cargarOdonto(){
    
  }

}
