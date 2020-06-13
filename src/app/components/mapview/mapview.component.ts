import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../class/marcador.class';






@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.css']
})

export class MapviewComponent implements OnInit {

  coordsActua: any;
  marcadores: Marcador[] = [];
  marcadoresActual: Marcador[] = [];

  lat: number;
  lng: 75.61827329202217;
/*
  mostrarUbicacion(ubicacion) {
    console.log('entre aqui')
    const lng = ubicacion.coords.longitude;
    const lat = ubicacion.coords.latitude;
    console.log(`longitud: ${lng} | latitud: ${lat}`);

    // console.log('longitud: ${lng} | latitud: ${lat}');
    // // const nuevoMarcador = new Marcador(lat, lng);
    // // this.marcadores.push(nuevoMarcador);
    // const nuevoMarcador = new Marcador(6.150344, -75.61827329202217);
    // this.marcadores.push(nuevoMarcador);
    // console.log(this.marcadores);

  }
*/
  constructor() {

    // this.marcadores = [];


    const onUbicacionConcedida = ubicacion => {
      this.marcadores = [];
      const nuevoMarcador = new Marcador(ubicacion.coords.latitude, ubicacion.coords.longitude);
      this.marcadores.push(nuevoMarcador);
      this.marcadoresActual.push(nuevoMarcador);
      console.log(this.marcadores);
    }

    const onErrorDeUbicacion = err => {
      console.log("Error obteniendo ubicación: ", err);
    }

    const opcionesDeSolicitud = {
      enableHighAccuracy: true, // Alta precisión
      maximumAge: 0, // No queremos caché
      timeout: 5000 // Esperar solo 5 segundos
    };
    // Solicitar
    navigator.geolocation.getCurrentPosition(onUbicacionConcedida, onErrorDeUbicacion, opcionesDeSolicitud);


  }

  ngOnInit(): void {


  }



  cambiarMarcador(evento) {
    this.marcadores = [];
    const coords: { lat: number, lng: number } = evento.coords;
    const nuevoMarcador = new Marcador(coords.lat, coords.lng);
    this.marcadores.push(nuevoMarcador);
    console.log(this.marcadores);
  }
}
