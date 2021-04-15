import { Routes } from "@angular/router";
import { CitasComponent } from 'src/app/components/citas/citas.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { AccessGuard } from 'src/app/guards/access.guard';
import { AdminGuard } from "src/app/guards/admin.guard";
import { DoctorGuard } from "src/app/guards/doctor.guard";
import { LoginGuard } from 'src/app/guards/login.guard';
import { AntecedenteComponent } from "src/app/pages/antecedente/antecedente.component";
import { CitasMedicoComponent } from "src/app/pages/citas-medico/citas-medico.component";
import { HistorialComponent } from "src/app/pages/historial/historial.component";
import { OdontogramaComponent } from "src/app/pages/odontograma/odontograma.component";
import { UsuarioComponent } from "src/app/pages/usuario/usuario.component";

import { CalendarComponent } from "src/app/components/calendar/calendar.component";

import { RecepcionGuard } from "src/app/guards/recepcion.guard";
import {AdministratorComponent} from "src/app/components/administrator/administrator.component";
import { DisponibilidadComponent } from "src/app/pages/disponibilidad/disponibilidad.component";
import { UserCreateComponent } from "src/app/components/administrator/user-create/user-create.component";

export const ROUTES:Routes = [
    {path:'home',component: HomeComponent,canActivate:[AccessGuard],data:{breadcrumb: 'Home'}},
    {path: 'register', component: RegisterComponent, canActivate: [LoginGuard]},
    {path: 'login', component:LoginComponent, canActivate: [LoginGuard]},

    {path: 'citas', component:CitasComponent,canActivate:[AccessGuard]},
    {path: 'historiaClinica', component:HistorialComponent,canActivate:[AccessGuard]},
    {path: 'admin/usuarios', component:AdministratorComponent,canActivate:[AccessGuard,AdminGuard]},
    {path: 'admin/crear', component:UserCreateComponent,canActivate:[AccessGuard,AdminGuard]},

    {path: 'doctor',children:[
        {path: 'agenda', component:CitasMedicoComponent,canActivate:[AccessGuard,DoctorGuard],data:{breadcrumb: 'Agenda'}},
        {path: 'antecedente/:id', component:AntecedenteComponent,canActivate:[AccessGuard,DoctorGuard],data:{breadcrumb: 'Antecedente'}},
    ]},
    {path: 'doctor/odontograma', component:OdontogramaComponent,canActivate:[AccessGuard,DoctorGuard],data:{breadcrumb: 'Odontograma'}},
    {path: 'doctor/odontograma/:id', component:OdontogramaComponent,canActivate:[AccessGuard,DoctorGuard],data:{breadcrumb: 'Odontograma'}},
    {path: 'calendar', component:CalendarComponent,canActivate:[AccessGuard,RecepcionGuard],data:{breadcrumb: 'Calendario'}},
    {path: 'dispo', component:DisponibilidadComponent ,canActivate:[AccessGuard,RecepcionGuard],data:{breadcrumb: ' Disponibilidad'}},


    {path: '', pathMatch: 'full', redirectTo: 'login'},
    {path: '**', pathMatch: 'full', redirectTo: 'login'},
];