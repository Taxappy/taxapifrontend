import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { BoardModeratorComponent } from './components/board-moderator/board-moderator.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { TaxiHomeComponent } from './components/taxi/taxi-home/taxi-home.component';
import { ListTaxiComponent } from './components/taxi/list-taxi/list-taxi.component';
import { TaxistaOFListComponent } from './components/Empleados/taxista-oflist/taxista-oflist.component';
import { HomeTaxistaComponent } from './components/taxista/home-taxista/home-taxista.component';
import { HistorialTaxistaComponent } from './components/taxista/historial-taxista/historial-taxista.component';
import { ConfiguracionesTaxistaComponent } from './components/taxista/configuraciones-taxista/configuraciones-taxista.component';
import { HistorialUserComponent } from './components/historial-user/historial-user.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'historial', component: HistorialUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'TaxiHome', component: TaxiHomeComponent },
  { path: 'TaxiList', component: ListTaxiComponent },
  { path: 'TaxistaList', component: TaxistaOFListComponent },
  { path: 'TaxisitaHome', component: HomeTaxistaComponent },
  { path: 'TaxisitaHistorial', component: HistorialTaxistaComponent },
  { path: 'TaxisitaConfig', component: ConfiguracionesTaxistaComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
