import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { userModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  user:userModel;
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.user = new userModel;
  }

  login(form:NgForm){
    if (form.invalid) {
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      icon:'info',
      title: 'Espere por favor...'
    });
    Swal.showLoading();
    this.auth.login(this.user)
    .subscribe(resp=>{
    Swal.close();
    location.reload();
    },
    (err)=>{
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: err.error.message
      })});
  }
}
