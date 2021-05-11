import { Routes } from "@angular/router";
import { HomeComponent } from 'src/app/components/home/home.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { AccessGuard } from 'src/app/guards/access.guard';
import { LoginGuard } from 'src/app/guards/login.guard';
import { MEDICO_ROUTES } from "./medico.routes";
import { PACIENTE_ROUTES } from "./paciente.routes";
import { ADMIN_ROUTES } from "./administrador.routes";
import { RECEPCION_ROUTES } from "./recepcion.routes";

export const ROUTES:Routes = [
    {path:'home',data:{crumb: 'Inicio'},children:[
        {path:'',component: HomeComponent,canActivate:[AccessGuard]},
    ]},
    {path: 'doctor',children: MEDICO_ROUTES,data:{crumb: 'Inicio'}},
    {path: 'paciente',children:PACIENTE_ROUTES,data:{crumb:'Inicio'}},
    {path: 'admin',children:ADMIN_ROUTES,data:{crumb:'Inicio'}},
    {path: 'recepcion',children:RECEPCION_ROUTES,data:{crumb:'Inicio'}},

    {path: 'register', component: RegisterComponent, canActivate: [LoginGuard]},
    {path: 'login', component:LoginComponent, canActivate: [LoginGuard]},

    {path: '', pathMatch: 'full', redirectTo: 'login'},
    {path: '**', pathMatch: 'full', redirectTo: 'login'},
];
