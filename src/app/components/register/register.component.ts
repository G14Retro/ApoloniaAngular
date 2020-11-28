import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { userModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  user:userModel;
  confir:Boolean=false;
  constructor(private auth:AuthService, private route:Router) { }

  ngOnInit(): void {
    this.user = new userModel;
  }
  
  patienSave(form:NgForm){
    if(this.user.password != this.user.password_confirmation){
      this.confir=true;
      return;
    }else{
      this.confir=false;
    }
    
    if (form.invalid) {
      return;
    }
    this.user.fecha_nacimiento = moment(this.user.fecha_nacimiento).format("YYYY-MM-DD");
    console.log(this.user);
    this.auth.patienSave(this.user)
    .subscribe(resp=>
      this.route.navigateByUrl('/login'),
    (err=>console.log(err)));
  }
}
