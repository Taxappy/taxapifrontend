import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';

const API_URL = 'http://localhost:8762';

@Injectable({
  providedIn: 'root'
})

export class TaxiService {

  constructor(private http: HttpClient) { }

  taxi$ = new EventEmitter<any>();

  getAllTaxi(): Observable<any> {
    return this.http.get(API_URL + '/taxi');
  }



  postTaxi(taxi): Observable<any> {
    return this.http.post(API_URL + '/taxi', {
      placa: taxi.placa,
    });
  }

  deleteTaxi(placa) {
    return this.http.delete(API_URL + '/taxi/' + placa);
  }



}
