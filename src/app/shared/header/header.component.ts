import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AppComponent } from "src/app/app.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(private auth:AuthService, public exp:AppComponent) { }

  ngOnInit(): void {
  }

  logout(){
    this.auth.logout().subscribe(
      (resp)=>{
      location.reload()}
    );
  }
}
