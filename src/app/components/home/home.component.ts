import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ViajesService } from 'src/app/services/viajes.service';
import Swal from 'sweetalert2';

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

  viajes: any = [];
  codigos: any = [];
  viaje: any = {};

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
      const taxi = JSON.parse(data);
      if (this.viajes.length === 0) {
        return;
      }
      const posicion = this.codigos.indexOf(taxi.idTaxistaNotificacion);
      if (posicion !== -1) {
        taxi.fechaViaje = this.obtenerFecha();
        this.viajes[posicion].estado = 'Aceptado';
        Swal.fire({
          imageUrl: '../../../assets/Taxi-Icono.png',
          imageWidth: 150,
          imageHeight: 150,
          title: 'Esperame tantito',
          text: 'El Viaje ' + (posicion + 1) + ' ha sido aceptado',
          showConfirmButton: false,
          timer: 4000
        });
      }
    });
  }

  setUbicacion(ubicacion) {
    this.ubicacion = ubicacion;
  }

  pedirTaxi(datos) {

    this.viaje = {
      latitud: `${this.ubicacion.lat}`,
      longitud: `${this.ubicacion.lng}`,
      idUsuario: parseInt(datos.id, 10)
    };
    this.viajeService.pedirViaje(this.viaje).subscribe(data => {
      data.estado = 'Esperando';
      data.fechaViaje = this.obtenerFecha();
      this.viajes.push(data);
      this.codigos.push(data.id);
      this.viaje = data;
      Swal.fire({
        // icon: 'success',
        imageUrl: '../../../assets/Persona-Icono.png',
        imageWidth: 150,
        imageHeight: 150,
        title: 'Esperemos tantito una respuesta',
        showConfirmButton: false,
        timer: 4000
      });
    }
      // , err => {
      //   console.log(err);
      // }
    );
  }

  obtenerFecha() {
    const fecha = new Date();
    const dd = fecha.getDate();
    const mm = fecha.getMonth() + 1;
    const yyyy = fecha.getFullYear();
    return dd + '-' + mm + '-' + yyyy;
  }

  cancelarViaje(index) {
    this.viajeService.cancelarViaje(this.viajes[index]).subscribe(data => {
      const guardarViaje = {
        idUsuario: this.viajes[index].idUsuario,
        fechaViaje: this.obtenerFecha(),
        estado: 'Cancelado',
        latitud: this.viajes[index].latitud,
        longitud: this.viajes[index].longitud
      };
      this.viajeService.guardarViaje(guardarViaje).subscribe(data => {
        this.viajes[index] = guardarViaje;
      });
    });
  }

  ngOnDestroy() {
    delete this.viajeService;
  }

}
