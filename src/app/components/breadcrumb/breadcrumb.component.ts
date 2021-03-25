import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit,OnDestroy {

  constructor( private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {

  }
  ngOnDestroy(){
    console.log("Pasando por destroy");
  }

}
