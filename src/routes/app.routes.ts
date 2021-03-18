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

export const ROUTES:Routes = [
    {path:'home',component: HomeComponent,canActivate:[AccessGuard]},
    {path: 'register', component: RegisterComponent, canActivate: [LoginGuard]},
    {path: 'login', component:LoginComponent, canActivate: [LoginGuard]},
    {path: 'citas', component:CitasComponent,canActivate:[AccessGuard]},
    {path: 'historiaClinica', component:HistorialComponent,canActivate:[AccessGuard]},
    {path: 'admin/usuarios', component:UsuarioComponent,canActivate:[AccessGuard,AdminGuard]},
    {path: 'doctor/agenda', component:CitasMedicoComponent,canActivate:[AccessGuard,DoctorGuard]},
    {path: 'doctor/antecedente/:id', component:AntecedenteComponent,canActivate:[AccessGuard,DoctorGuard]},
    {path: 'doctor/odontograma', component:OdontogramaComponent,canActivate:[AccessGuard,DoctorGuard]},
    {path: 'doctor/odontograma/:id', component:OdontogramaComponent,canActivate:[AccessGuard,DoctorGuard]},
    {path: '', pathMatch: 'full', redirectTo: 'login'},
    {path: '**', pathMatch: 'full', redirectTo: 'login'},
];