import { Routes } from '@angular/router';
import { AdministratorComponent } from "src/app/components/administrator/administrator.component";
import { UserCreateComponent } from "src/app/components/administrator/user-create/user-create.component";
import { UserUpdateComponent } from "src/app/components/administrator/user-update/user-update.component";
import { HomeComponent } from 'src/app/components/home/home.component';
import { AccessGuard } from 'src/app/guards/access.guard';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { ListarTratamientoComponent} from 'src/app/components/administrator/listar-tratamiento/listar-tratamiento.component';
import { ListarSintomasComponent} from 'src/app/components/administrator/listar-sintomas/listar-sintomas.component';

export const ADMIN_ROUTES: Routes = [
    {path:'',component:HomeComponent,canActivate:[AccessGuard]},
    {path: 'tratamientos', component:ListarTratamientoComponent,canActivate:[AccessGuard,AdminGuard],data:{crumb:'Tratamientos'}},
    {path: 'sintomas', component:ListarSintomasComponent,canActivate:[AccessGuard,AdminGuard],data:{crumb:'Sintomas'}},
    {path: 'usuarios', data:{crumb:'Usuarios'},children:[
        {path:'',component:AdministratorComponent,canActivate:[AccessGuard,AdminGuard]},
        {path: 'crear', component:UserCreateComponent,canActivate:[AccessGuard,AdminGuard],data:{crumb:'Crear'}},
        {path: 'update/:id', component:UserUpdateComponent,canActivate:[AccessGuard,AdminGuard],data:{crumb:'Editar'}},

    ]},
]
