import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';



import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeEmpleadosComponent } from './components/Empleados/home-empleados/home-empleados.component';
import { RegisterComponent } from './components/Empleados/register/register.component';

import { TaxistaOFListComponent } from './components/Empleados/taxista-oflist/taxista-oflist.component';

import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardModeratorComponent } from './components/board-moderator/board-moderator.component';
import { BoardUserComponent } from './components/board-user/board-user.component';

import { authInterceptorProviders } from './helpers/auth.interceptor';

import { MapviewComponent } from './components/mapview/mapview.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { ListTaxiComponent } from './components/taxi/list-taxi/list-taxi.component';
import { TaxiHomeComponent } from './components/taxi/taxi-home/taxi-home.component';
import { CreateTaxiComponent } from './components/taxi/create-taxi/create-taxi.component';
import { ConfiguracionesTaxistaComponent } from './components/taxista/configuraciones-taxista/configuraciones-taxista.component';
import { HistorialTaxistaComponent } from './components/taxista/historial-taxista/historial-taxista.component';
import { HomeTaxistaComponent } from './components/taxista/home-taxista/home-taxista.component';
import { MapviewTaxistaComponent } from './components/taxista/mapview-taxista/mapview-taxista.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    MapviewComponent,
    SolicitudComponent,
    ListTaxiComponent,
    TaxiHomeComponent,
    CreateTaxiComponent,
    HomeEmpleadosComponent,
    TaxistaOFListComponent,
    ConfiguracionesTaxistaComponent,
    HistorialTaxistaComponent,
    HomeTaxistaComponent,
    MapviewTaxistaComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCWOR0jWaJbXeWJ6-UgMOIPT_d7O1idxiE'
    })
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
