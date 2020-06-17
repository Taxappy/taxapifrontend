import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000';

const URL_MICROSERVER = 'http://localhost:8762';



@Injectable({
  providedIn: 'root'
})
export class TaxistaService {

  constructor(private http: HttpClient) { }

  taxista$ = new EventEmitter<any>();


  getAllTaxista(): Observable<any> {
    return this.http.get(URL_MICROSERVER + '/taxista');
  }

  getONETaxistaBLog(identificacion): Observable<any> {
    return this.http.get(AUTH_API + "/api/users/identificacion/" + identificacion);
  }

  usarTaxi(data): Observable<any> {
    return this.http.post(URL_MICROSERVER + '/taxista/usotaxi', data);
  }

  setViajeActual(viaje?: any) {
    if (!viaje) {
      viaje = null;
    }
    window.sessionStorage.setItem('viaje_actual', JSON.stringify(viaje));
  }

  getViajeActual() {
    return JSON.parse(sessionStorage.getItem('viaje_actual'));
  }
}
