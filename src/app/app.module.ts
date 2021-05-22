import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { registerLocaleData, TitleCasePipe, CurrencyPipe } from '@angular/common';
import { MatTableExporterModule } from 'mat-table-exporter';


//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CitasComponent } from './components/citas/citas.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { HeaderComponent } from './shared/header/header.component';
import { ConfirmacionComponent } from './components/citas/confirmacion/confirmacion.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { CitasMedicoComponent } from './pages/citas-medico/citas-medico.component';
import { LoadingComponent } from './components/loading/loading.component';
import { OdontogramaComponent } from './pages/odontograma/odontograma.component';
import { CanvasOdontogramaComponent } from './components/canvas-odontograma/canvas-odontograma.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { DisponibilidadComponent } from './pages/disponibilidad/disponibilidad.component';
import { TablaDispoComponent } from './components/tabla-dispo/tabla-dispo.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { UserCreateComponent } from './components/administrator/user-create/user-create.component';
import { UserUpdateComponent } from './components/administrator/user-update/user-update.component';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import { DetalleHistorialComponent } from './pages/historial/detalle-historial/detalle-historial.component';
import { TablaPacientesComponent } from './components/tabla-pacientes/tabla-pacientes.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { DetallePacienteComponent } from './pages/pacientes/detalle-paciente/detalle-paciente.component';
import { TablaOdontogramaComponent } from './components/tabla-odontograma/tabla-odontograma.component';
import { DiagnosticoComponent } from './pages/diagnostico/diagnostico.component';
import { PacienteAntecedenteComponent } from './pages/pacientes/paciente-antecedente/paciente-antecedente.component';
import { SuperficieComponent } from './pages/diagnostico/superficie/superficie.component';


// Modulos
import { RouterModule } from '@angular/router';
import { ROUTES } from 'src/routes/app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule} from '@angular/material/select';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { MatDialogModule } from '@angular/material/dialog';
import { CopyPasteDirective } from './directives/copy-paste.directive';
import { ScheduleModule,RecurrenceEditorModule } from "@syncfusion/ej2-angular-schedule";
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule  } from "@angular-material-components/datetime-picker";
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxCrumbsModule } from "ngx-crumbs";
import { CalendarModule } from '@syncfusion/ej2-angular-calendars';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';


//Provaiders
import localeEsCO from "@angular/common/locales/es-CO";
import { TablaDiagnosticoComponent } from './components/tabla-diagnostico/tabla-diagnostico.component';
import { EditarDiagnosticoComponent } from './components/tabla-diagnostico/editar-diagnostico/editar-diagnostico.component';
registerLocaleData(localeEsCO,'es-CO')

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    NavbarComponent,
    CitasComponent,
    HeaderComponent,
    ConfirmacionComponent,
    HistorialComponent,
    UsuarioComponent,
    CitasMedicoComponent,
    LoadingComponent,
    OdontogramaComponent,
    CalendarComponent,
    CopyPasteDirective,
    BreadcrumbComponent,
    CanvasOdontogramaComponent,
    DisponibilidadComponent,
    TablaDispoComponent,
    AdministratorComponent,
    EditDialogComponent,
    AddDialogComponent,
    UserCreateComponent,
    UserUpdateComponent,
    AddDialogComponent,
    DetalleHistorialComponent,
    TablaPacientesComponent,
    PacientesComponent,
    DetallePacienteComponent,
    TablaOdontogramaComponent,
    DiagnosticoComponent,
    DetalleHistorialComponent,
    PacienteAntecedenteComponent,
    SuperficieComponent,
    TablaDiagnosticoComponent,
    EditarDiagnosticoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {useHash:false}),
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatStepperModule,
    MatSelectModule,
    ScheduleModule,
    RecurrenceEditorModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatButtonToggleModule,
    MatTableExporterModule,
    MatGridListModule,
    NgxCrumbsModule,
    CalendarModule,
    MatListModule,
    MatExpansionModule,
    MatTooltipModule,
    MatExpansionModule
  ],

  providers: [
    AgendaService, DayService, WeekService, WorkWeekService, MonthService,
    TitleCasePipe,
    AuthService,
    CurrencyPipe,
    {provide: MAT_DATE_LOCALE,
    useValue: 'es-CO'},
    {provide: LOCALE_ID,
    useValue: 'es-CO'},
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'COP' }
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
