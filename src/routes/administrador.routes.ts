import { Routes } from '@angular/router';
import { AdministratorComponent } from "src/app/components/administrator/administrator.component";
import { UserCreateComponent } from "src/app/components/administrator/user-create/user-create.component";
import { UserUpdateComponent } from "src/app/components/administrator/user-update/user-update.component";
import { HomeComponent } from 'src/app/components/home/home.component';
import { AccessGuard } from 'src/app/guards/access.guard';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { ListarTratamientoComponent} from 'src/app/components/administrator/listar-tratamiento/listar-tratamiento.component';
import { ListarSintomasComponent} from 'src/app/components/administrator/listar-sintomas/listar-sintomas.component';
import { CrearSintomasComponent } from 'src/app/components/administrator/listar-sintomas/crear-sintomas/crear-sintomas.component';
import { ActualizarSintomasComponent } from 'src/app/components/administrator/listar-sintomas/actualizar-sintomas/actualizar-sintomas.component';
import { CrearTratamientoComponent } from 'src/app/components/administrator/listar-tratamiento/crear-tratamiento/crear-tratamiento.component';
import { ActualizarTratamientoComponent } from 'src/app/components/administrator/listar-tratamiento/actualizar-tratamiento/actualizar-tratamiento.component';


export const ADMIN_ROUTES: Routes = [
    {path:'',component:HomeComponent,canActivate:[AccessGuard]},

    {path: 'tratamientos', data:{crumb:'Tratamientos'},children:[
        {path:'',component:ListarTratamientoComponent,canActivate:[AccessGuard,AdminGuard]},   
        {path: 'crear', component:CrearTratamientoComponent,canActivate:[AccessGuard,AdminGuard],data:{crumb:'Crear'}},
        {path: 'tratamientos', component:ListarTratamientoComponent,canActivate:[AccessGuard,AdminGuard],data:{crumb:'Tratamientos'}},
        {path: 'actualizar/:id', component:ActualizarTratamientoComponent,canActivate:[AccessGuard,AdminGuard],data:{crumb:'Actualizar'}},

        
    ]},   
    
    {path: 'sintomas', data:{crumb:'Sintomas'},children:[
        {path:'',component:ListarSintomasComponent,canActivate:[AccessGuard,AdminGuard]},   
        {path: 'crear', component:CrearSintomasComponent,canActivate:[AccessGuard,AdminGuard],data:{crumb:'Crear'}},
        {path: 'sintomas', component:ListarSintomasComponent,canActivate:[AccessGuard,AdminGuard],data:{crumb:'Sintomas'}},
        {path: 'actualizar/:id', component:ActualizarSintomasComponent,canActivate:[AccessGuard,AdminGuard],data:{crumb:'Actualizar'}},
    ]},   
    {path: 'usuarios', data:{crumb:'Usuarios'},children:[
        {path:'',component:AdministratorComponent,canActivate:[AccessGuard,AdminGuard]},
        {path: 'crear', component:UserCreateComponent,canActivate:[AccessGuard,AdminGuard],data:{crumb:'Crear'}},
        {path: 'update/:id', component:UserUpdateComponent,canActivate:[AccessGuard,AdminGuard],data:{crumb:'Editar'}},

    ]},
]
