import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ViajesService } from 'src/app/services/viajes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  content: string;
  ubicacion = {
    lat: '',
    lng: ''
  };
  viaje:any = {};

  codViaje: string;


  constructor(private userService: UserService, private viajeService: ViajesService) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );

    this.viajeService.initializeWebSocketRespuestaDeViaje();

    this.viajeService.taxi$.subscribe(data => {
      let taxi = JSON.parse(data);

      console.log(taxi.idTaxistaNotificacion);
      console.log(taxi.id);
      console.log(this.viaje.id);
      if (this.viaje == {}) {
        return;
      }
      if (this.viaje.id == taxi.idTaxistaNotificacion) {
        console.log('Llegó', taxi);
      }
      
    });
  }

  setUbicacion(ubicacion) {
    this.ubicacion = ubicacion;
    console.log(this.ubicacion);
  }

  pedirTaxi(datos) {

    this.viaje = {
      latitud: `${this.ubicacion.lat}`,
      longitud: `${this.ubicacion.lng}`,
      idUsuario: parseInt(datos.id, 10)
    };
    console.log(this.viaje);
    this.viajeService.pedirViaje(this.viaje).subscribe(data => {
      console.log(data);
      this.viaje = data;
    }
    // , err => {
    //   console.log(err);
    // }
    );
  }

  ngOnDestroy() {
    delete this.viajeService;
  }

}
