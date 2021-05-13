import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { odontoModel } from 'src/app/models/odontograma.model';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-canvas-odontograma',
  templateUrl: './canvas-odontograma.component.html',
  styleUrls: ['./canvas-odontograma.component.css']
})
export class CanvasOdontogramaComponent implements OnInit,AfterViewInit {
  fillColor:String = 'white';
  fill;
  odontograma:odontoModel;
  nativo:any;
  arcada1:number[]=[];
  arcada2:number[]=[];
  arcada3:number[]=[];
  arcada4:number[]=[];
  temporal1:number[] =[];
  temporal2:number[] =[];
  temporal3:number[] =[];
  temporal4:number[] =[];
  temporales:boolean = false;
  @ViewChild('odontograma') odonto:ElementRef<HTMLElement>;
  @ViewChild('comentario') comentario:ElementRef<HTMLTextAreaElement>;
  @HostListener('document:click',['$event']) 
  mouseClick = (e:any)=>{
    if (e.target.parentNode.nodeName === 'svg') {
      this.changeColor(e.toElement);
    }
  }
  public context:CanvasRenderingContext2D;
  constructor(private ruta:ActivatedRoute, private doctor:DoctorService, private router:Router) {

  }

  ngOnInit(): void {
    this.odontograma = new odontoModel();
    this.pintarOdontograma();
  }
  
  ngAfterViewInit():void{
    sessionStorage.setItem('html',this.odonto.nativeElement.innerHTML);
    console.log(this.odonto);
    this.odonto.nativeElement.children.namedItem('arcada1').children.item(0).children.namedItem('18').children.namedItem('ausente').attributes.getNamedItem('stroke').value="black";
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

  blanco(){
    this.fillColor ='white'
  }

  ausente(){

  }

  borrarTodo(){
    this.odonto.nativeElement.innerHTML = sessionStorage.getItem('html');
  }

  guardarOdonto(){
    this.ruta.params.subscribe(params=>{
      this.odontograma.odontograma = this.odonto.nativeElement.innerHTML;
      this.odontograma.ficha = params['id'];
      this.odontograma.comentario = this.comentario.nativeElement.value;
      this.doctor.guardarOdonto(this.odontograma).subscribe(resp=>{
        this.router.navigateByUrl('/doctor/pacientes/diagnostico/'+resp)
      },err=>{
        console.log(err);
      })
    })

  }
  pintarOdontograma(){
    for (let i = 18; i > 10; i--) {
      this.arcada1.push(i)
    }
    for (let i = 21; i < 29; i++) {
      this.arcada2.push(i)
    }
    for (let i = 48; i > 40; i--) {
      this.arcada4.push(i)
    }
    for (let i = 31; i < 39; i++) {
      this.arcada3.push(i)
    }

    for (let i = 55; i > 50; i--) {
      this.temporal1.push(i)
    }

    for (let i = 61; i < 66; i++) {
      this.temporal2.push(i)
    }

    for (let i = 85; i > 80; i--) {
      this.temporal3.push(i)
    }

    for (let i = 71; i < 76; i++) {
      this.temporal4.push(i)
    }
  }

  verTemporales(){
    this.temporales = true;
  }

  quitarTemporales(){
    this.temporales = false;
  }
  nuevoOdonto(){
    this.pintarOdontograma();
  }
  cargarOdonto(){
    this.ruta.params.subscribe(params=>{
      this.doctor.getOdonto(params['id']).subscribe((resp:any)=>{
        console.log(resp);
        if (resp==null) {
          this.odonto.nativeElement.innerHTML = sessionStorage.getItem('html');
        } else {
          this.odonto.nativeElement.innerHTML = resp[0].odontograma;
          this.comentario.nativeElement.value = resp[0].comentario;
        }
      })
    })
  }
}
