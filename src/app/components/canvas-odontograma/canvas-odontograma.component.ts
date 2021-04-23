import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

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
  @ViewChild(TemplateRef,{static:true}) odontoTemplate:TemplateRef<any>;
  @ViewChild(TemplateRef,{static:true, read:ViewContainerRef}) odontoContainer:ViewContainerRef;
  constructor() {

  }

  ngOnInit(): void {
    
  }
  
  ngAfterViewInit(){
    this.odontoContainer.createEmbeddedView(this.odontoTemplate);
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
    // this.htmlString = odonto.innerHTML;
    this.nativo = this.odontoContainer;
    console.log(this.nativo);
    localStorage.setItem('html',this.nativo.toString())
  }
  cargarOdonto(){
    this.odontoTemplate = this.nativo;
  }

}
