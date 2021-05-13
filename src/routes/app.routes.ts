import { Routes } from "@angular/router";
import { HomeComponent } from 'src/app/components/home/home.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { AccessGuard } from 'src/app/guards/access.guard';
import { LoginGuard } from 'src/app/guards/login.guard';
import { MEDICO_ROUTES } from "./medico.routes";
import { PACIENTE_ROUTES } from "./paciente.routes";
import { ADMIN_ROUTES } from "./administrador.routes";
import { RECEPCION_ROUTES } from "./recepcion.routes";

export const ROUTES:Routes = [
<<<<<<< HEAD
    {path:'dashboard',component: DashboardComponent,canActivate:[AccessGuard],data:{breadcrumb: 'dashboard'}},
    {path:'home',component: HomeComponent,canActivate:[AccessGuard],data:{breadcrumb: 'Home'}},
    {path: 'register', component: RegisterComponent, canActivate: [LoginGuard]},
    {path: 'login', component:LoginComponent, canActivate: [LoginGuard]},

    {path: 'citas', component:CitasComponent,canActivate:[AccessGuard]},
    {path: 'historial', component:HistorialComponent,canActivate:[AccessGuard]},
    {path: 'historial/detalle/:id', component:DetalleHistorialComponent,canActivate:[AccessGuard]},
    {path: 'admin/usuarios', component:AdministratorComponent,canActivate:[AccessGuard,AdminGuard]},
    {path: 'admin/crear', component:UserCreateComponent,canActivate:[AccessGuard,AdminGuard]},
    {path: 'admin/update/:id', component:UserUpdateComponent,canActivate:[AccessGuard,AdminGuard]},

    {path: 'doctor',children:[
        {path: 'agenda', component:CitasMedicoComponent,canActivate:[AccessGuard,DoctorGuard],data:{breadcrumb: 'Agenda'}},
        {path: 'pacientes',children:[
            {path: '', component:PacientesComponent,canActivate:[AccessGuard,DoctorGuard],data:{breadcrumb: 'Pacientes'}},
            {path: 'odontograma/:id', component:CanvasOdontogramaComponent,canActivate:[AccessGuard,DoctorGuard],data:{breadcrumb: 'Odontograma'}},
            {path: 'detalle-paciente/:id', component:DetallePacienteComponent,canActivate:[AccessGuard,DoctorGuard],data:{breadcrumb: 'Detalle'}},
            {path: 'diagnostico/:id', component:DiagnosticoComponent,canActivate:[AccessGuard,DoctorGuard],data:{breadcrumb: 'Detalle'}},
        ]},
        {path: 'antecedente/:id', component:AntecedenteComponent,canActivate:[AccessGuard,DoctorGuard],data:{breadcrumb: 'Antecedente'}},
=======
    {path:'home',data:{crumb: 'Inicio'},children:[
        {path:'',component: HomeComponent,canActivate:[AccessGuard]},
>>>>>>> 75e0399ae551f52db810f84da9c82ef819f5769d
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
