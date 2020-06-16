import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

declare var SockJS;
declare var Stomp;
const URL_MICROSERVER = 'http://localhost:8762';

@Injectable({
  providedIn: 'root'
})
export class ViajesService {

  public stompClient;

  viajes$ = new EventEmitter<any>();
  taxi$ = new EventEmitter<any>();

  constructor(private http: HttpClient) {
    // this.initializeWebSocketRecibirViajes();
   }

  initializeWebSocketRecibirViajes() {
    const serverUrl = 'http://localhost:2002/websocket/socket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/websocket/taxista', (message) => {
        if (message.body) {
          that.viajes$.emit(message.body);
        }
      });
    });
  }

  initializeWebSocketRespuestaDeViaje() {
    const serverUrl = 'http://localhost:2002/websocket/socket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/websocket/usuario', (message) => {
        if (message.body) {
          that.taxi$.emit(message.body);
        }
      });
    });
  }

  pedirViaje(info) {
    return this.http.post(URL_MICROSERVER + '/viaje/notificacion/taxista', info);
  }

  getAllViajes(): Observable<any> {
    return this.http.get(URL_MICROSERVER + '/viaje/notificacion/taxista');
  }

  aceptarViaje(info): Observable<any> {
    return this.http.post(URL_MICROSERVER + '/viaje/notificacion/usuario', info);
  }
}
