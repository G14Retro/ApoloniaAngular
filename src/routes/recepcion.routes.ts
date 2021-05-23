import { Routes } from '@angular/router';
import { TablaCitasComponent } from 'src/app/components/tabla-citas/tabla-citas.component';
import { AccessGuard } from 'src/app/guards/access.guard';
import { RecepcionGuard } from "src/app/guards/recepcion.guard";
import { DisponibilidadComponent } from "src/app/pages/disponibilidad/disponibilidad.component";

export const RECEPCION_ROUTES: Routes = [
    {path: 'citas', component:TablaCitasComponent,canActivate:[AccessGuard,RecepcionGuard],data:{crumb: 'Citas'}},
    {path: 'dispo', component:DisponibilidadComponent ,canActivate:[AccessGuard,RecepcionGuard],data:{crumb: ' Disponibilidad'}},
]
