import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CitasComponent } from './components/citas/citas.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from 'src/routes/app.routes';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './shared/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatButtonModule } from '@angular/material/button';

import { ConfirmacionComponent } from './components/citas/confirmacion/confirmacion.component';
import {MatDialogModule } from '@angular/material/dialog';
import { HistorialComponent } from './pages/historial/historial.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { CitasMedicoComponent } from './pages/citas-medico/citas-medico.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    CitasComponent,
    HeaderComponent,
    ConfirmacionComponent,
    HistorialComponent,
    UsuarioComponent,
    CitasMedicoComponent     
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {useHash:false}),
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule

  ],
  
  providers: [
    AuthService,
    {provide: MAT_DATE_LOCALE,
    useValue: 'es-CO'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
