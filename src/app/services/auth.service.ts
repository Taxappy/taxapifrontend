import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000';

const URL_MICROSERVER = 'http://localhost:8762';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + '/api/auth/signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + '/api/auth/signup', {
      name: user.name,
      username: user.username,
      identificacion: user.identificacion,
      movile: user.movile,
      email: user.email,
      password: user.password,
      roles: user.role ,
    }, httpOptions);
  }

  registerUser(user): Observable<any>{
    return this.http.post(URL_MICROSERVER + '/usuario', {
      nombre: user.name,
      idUsuario: user.identificacion,
    }, httpOptions);
  }

  registerTaxista(user): Observable<any>{
    return this.http.post(URL_MICROSERVER + '/taxista', {
      nombre: user.name,
      idTaxista: user.identificacion,
    }, httpOptions);
  }

  deleteProfileB1(id){
    return this.http.delete(AUTH_API + '/api/auth/users/' + id);
  }

  deleteTaxistaB2(identificacion){
    return this.http.delete(URL_MICROSERVER + '/taxista/' + identificacion);
  }


}
