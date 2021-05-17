import { Routes } from '@angular/router';
import { CitasComponent } from 'src/app/components/citas/citas.component';
import { HistorialComponent } from "src/app/pages/historial/historial.component";
import { DetalleHistorialComponent } from "src/app/pages/historial/detalle-historial/detalle-historial.component";
import { AccessGuard } from 'src/app/guards/access.guard';
import { HomeComponent } from 'src/app/components/home/home.component';

export const PACIENTE_ROUTES: Routes = [
    {path:'',component: HomeComponent,canActivate:[AccessGuard]},
    {path: 'citas', component:CitasComponent,canActivate:[AccessGuard],data:{crumb: 'Citas'}},
    {path: 'historial', data:{crumb: 'Historial'},children:[
        {path: '',component:HistorialComponent,canActivate:[AccessGuard],},
        {path: 'detalle/:id', component:DetalleHistorialComponent,canActivate:[AccessGuard],data:{crumb: 'Detalle'}},
    ]},
]