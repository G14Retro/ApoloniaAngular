import { Routes } from "@angular/router";
import { CitasComponent } from 'src/app/components/citas/citas.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { AccessGuard } from 'src/app/guards/access.guard';
import { AdminGuard } from "src/app/guards/admin.guard";
import { DoctorGuard } from "src/app/guards/doctor.guard";
import { LoginGuard } from 'src/app/guards/login.guard';
import { AntecedenteComponent } from "src/app/pages/antecedente/antecedente.component";
import { CitasMedicoComponent } from "src/app/pages/citas-medico/citas-medico.component";
import { HistorialComponent } from "src/app/pages/historial/historial.component";

import { CalendarComponent } from "src/app/components/calendar/calendar.component";

import { RecepcionGuard } from "src/app/guards/recepcion.guard";
import { AdministratorComponent } from "src/app/components/administrator/administrator.component";
import { DisponibilidadComponent } from "src/app/pages/disponibilidad/disponibilidad.component";
import { UserCreateComponent } from "src/app/components/administrator/user-create/user-create.component";
import { UserUpdateComponent } from "src/app/components/administrator/user-update/user-update.component";
import { DetalleHistorialComponent } from "src/app/pages/historial/detalle-historial/detalle-historial.component";
import { PacientesComponent } from "src/app/pages/pacientes/pacientes.component";
import { CanvasOdontogramaComponent } from "src/app/components/canvas-odontograma/canvas-odontograma.component";
import { DetallePacienteComponent } from "src/app/pages/pacientes/detalle-paciente/detalle-paciente.component";
import { DiagnosticoComponent } from "src/app/pages/diagnostico/diagnostico.component";

export const ROUTES:Routes = [
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
    ]},
    {path: 'calendar', component:CalendarComponent,canActivate:[AccessGuard,RecepcionGuard],data:{breadcrumb: 'Calendario'}},
    {path: 'dispo', component:DisponibilidadComponent ,canActivate:[AccessGuard,RecepcionGuard],data:{breadcrumb: ' Disponibilidad'}},


    {path: '', pathMatch: 'full', redirectTo: 'login'},
    {path: '**', pathMatch: 'full', redirectTo: 'login'},
];
