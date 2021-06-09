import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { odontoModel } from 'src/app/models/odontograma.model';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-canvas-odontograma',
  templateUrl: './canvas-odontograma.component.html',
  styleUrls: ['./canvas-odontograma.component.css']
})
export class CanvasOdontogramaComponent implements OnInit,AfterViewInit {
  paciente:string;
  fillColor:String = 'white';
  fill;
  item:number;
  odontograma:odontoModel;
  diagnosticos:[] = [];
  superficie:String;
  arcada1:number[]=[];
  arcada2:number[]=[];
  arcada3:number[]=[];
  arcada4:number[]=[];
  temporal1:number[] =[];
  temporal2:number[] =[];
  temporal3:number[] =[];
  temporal4:number[] =[];
  temporales:boolean = true;
  odontoID:String;
  loading:boolean = false;
  dienteForm:FormGroup;
  sano:boolean;
  @ViewChild('odontograma') odonto:ElementRef<HTMLElement>;
  @ViewChild('comentario') comentario:ElementRef<HTMLTextAreaElement>;
  @HostListener('document:click',['$event']) 
  mouseClick = (e:any)=>{
    if (e.target.parentNode.nodeName === 'svg') {
      this.getDiente(e.target.parentNode.id);
    }
  }
  public context:CanvasRenderingContext2D;
  constructor(private ruta:ActivatedRoute, private doctor:DoctorService, private router:Router,
              private fb:FormBuilder) {
    ruta.params.subscribe(params=>{
      this.odontoID = params['id'];
    })
  }

  ngOnInit(): void {
    this.odontograma = new odontoModel();
    this.pintarOdontograma();
    this.greateDienteForm();
    this.getPaciente();
  }
  
  ngAfterViewInit():void{
    this.cargarOdonto();
  }

  getPaciente(){
    this.doctor.getPacienteByOdonto(this.odontoID).subscribe((resp:any[])=>{
      this.paciente = resp[0].nombre + ' ' + resp[0].apellido;
    })
  }

  ausente(arcada:string,item:number,diente:string){
    this.odonto.nativeElement
    .children.namedItem(arcada)
    .children.item(item)
    .children.namedItem(diente)
    .children.namedItem('ausente').attributes.getNamedItem('stroke').value = "black";

    this.odonto.nativeElement
    .children.namedItem(arcada)
    .children.item(item)
    .children.namedItem(diente)
    .children.namedItem('ausente').attributes.getNamedItem('stroke-width').value = "4";

    this.odonto.nativeElement
    .children.namedItem(arcada)
    .children.item(item)
    .children.namedItem(diente)
    .children.namedItem('ausente1').attributes.getNamedItem('stroke').value = "black";

    this.odonto.nativeElement
    .children.namedItem(arcada)
    .children.item(item)
    .children.namedItem(diente)
    .children.namedItem('ausente1').attributes.getNamedItem('stroke-width').value = "4";
  }

  guardarOdonto(){
    
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

  cargarOdonto(){
    this.loading = true;
    this.doctor.cargarOdonto(this.odontoID).subscribe((resp:any)=>{   
      this.diagnosticos = resp;
      this.diagnosticos.forEach(diagnostico=>{
        this.item = 0;
        this.superficie = diagnostico['superficie'];
        if (Number(diagnostico['diente'])>=51 && Number(diagnostico['diente'])<=65) {
          this.item=1;
        }

        if (Number(diagnostico['diente'])>=71 && Number(diagnostico['diente'])<=85) {
          this.item=0;
        }

        if (Number(diagnostico['diente'])>=11 && Number(diagnostico['diente'])<=28) {
          this.item=0;
        }

        if (Number(diagnostico['diente'])>=31 && Number(diagnostico['diente'])<=48) {
          this.item=1;
        }

        if (this.superficie == 'AUSENTE') {
          this.ausente(diagnostico['arcada'],this.item,diagnostico['diente']);
        }else{
         this.superficie.split(',').forEach(lado=>{
            this.odonto.nativeElement
            .children.namedItem(diagnostico['arcada'])
            .children.item(this.item)
            .children.namedItem(diagnostico['diente'])
            .children.namedItem(lado).attributes.getNamedItem('fill').value = diagnostico['color'];
          })
        }

      });
      this.loading = false;
    })
  }

  greateDienteForm(){
    this.dienteForm = this.fb.group({
      diente: {value:'',disabled:true},
      sintoma: {value:'',disabled:true},
      observacion: {value:'',disabled:true},
      tratamiento: {value:'',disabled:true}
    });
  }

  getDiente(diente:string){
    this.doctor.getDiente(this.odontoID,diente).subscribe((resp:any[])=>{
      if (resp.length == 0) {
        this.sano = true;
      }else{
        this.sano = false;
        this.dienteForm.setValue(resp[0]);
      }
    });
  }
}
