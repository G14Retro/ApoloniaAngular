import { Routes } from '@angular/router';
import { CanvasOdontogramaComponent } from 'src/app/components/canvas-odontograma/canvas-odontograma.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { AccessGuard } from 'src/app/guards/access.guard';
import { DoctorGuard } from 'src/app/guards/doctor.guard';
import { AntecedenteComponent } from 'src/app/pages/antecedente/antecedente.component';
import { CitasMedicoComponent } from 'src/app/pages/citas-medico/citas-medico.component';
import { DiagnosticoComponent } from 'src/app/pages/diagnostico/diagnostico.component';
import { DetallePacienteComponent } from 'src/app/pages/pacientes/detalle-paciente/detalle-paciente.component';
import { PacienteAntecedenteComponent } from 'src/app/pages/pacientes/paciente-antecedente/paciente-antecedente.component';
import { PacientesComponent } from 'src/app/pages/pacientes/pacientes.component';

export const MEDICO_ROUTES: Routes = [
    {path:'',component: HomeComponent,canActivate:[AccessGuard]},
    {path: 'agenda',data:{crumb: 'Agenda'},children:[
        {path:'', component:CitasMedicoComponent,canActivate:[AccessGuard,DoctorGuard]},
        {path: 'antecedente/:id', component:AntecedenteComponent,canActivate:[AccessGuard,DoctorGuard],data:{crumb: 'Antecedentes'}},
    ]},
    {path: 'pacientes',data:{crumb: 'Pacientes'},children:[
        {path: '', component:PacientesComponent,canActivate:[AccessGuard,DoctorGuard]},
        {path: 'odontograma/:id', component:CanvasOdontogramaComponent,canActivate:[AccessGuard,DoctorGuard],data:{crumb: 'Odontograma'}},
        {path: 'detalle-paciente/:id', component:DetallePacienteComponent,canActivate:[AccessGuard,DoctorGuard],data:{crumb: 'Detalle'}},
        {path: 'diagnostico/:id', component:DiagnosticoComponent,canActivate:[AccessGuard,DoctorGuard],data:{crumb: 'Diagnostico'}},
        {path: 'antecedente/:id', component:PacienteAntecedenteComponent,canActivate:[AccessGuard,DoctorGuard],data:{crumb: 'Antecedente'}},
    ]},
]