import { Routes } from '@angular/router';
import { CalendarComponent } from "src/app/components/calendar/calendar.component";
import { AccessGuard } from 'src/app/guards/access.guard';
import { RecepcionGuard } from "src/app/guards/recepcion.guard";
import { DisponibilidadComponent } from "src/app/pages/disponibilidad/disponibilidad.component";

export const RECEPCION_ROUTES: Routes = [
    {path: 'calendar', component:CalendarComponent,canActivate:[AccessGuard,RecepcionGuard],data:{crumb: 'Calendario'}},
    {path: 'dispo', component:DisponibilidadComponent ,canActivate:[AccessGuard,RecepcionGuard],data:{crumb: ' Disponibilidad'}},
]