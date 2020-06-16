import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaxistaService } from 'src/app/services/taxista.service';
import { ViajesService } from 'src/app/services/viajes.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-mapview-taxista',
  templateUrl: './mapview-taxista.component.html',
  styleUrls: ['./mapview-taxista.component.css']
})
export class MapviewTaxistaComponent implements OnInit {


  posActual = {
    lat: 6.250092011900809,
    lng: -75.5676583094607
  };

  infoTaxista = {
    username: ''
  };

  viajes: any[] = [];
  constructor( private viajeService: ViajesService, private tokenStorageService: TokenStorageService ) {
    const onUbicacionConcedida = ubicacion => {
      this.posActual.lat = ubicacion.coords.latitude;
      this.posActual.lng = ubicacion.coords.longitude;
    };

    const onErrorDeUbicacion = err => {
      console.log("Error obteniendo ubicación: ", err);
    };

    const opcionesDeSolicitud = {
      enableHighAccuracy: true, // Alta precisión
      maximumAge: 0, // No queremos caché
      timeout: 5000 // Esperar solo 5 segundos
    };
    // Solicitar
    navigator.geolocation.getCurrentPosition(onUbicacionConcedida, onErrorDeUbicacion, opcionesDeSolicitud);
   }

  ngOnInit(): void {

    this.viajeService.viajes$.subscribe(viajes => {
      this.viajes = JSON.parse(viajes);
    });

    this.viajeService.getAllViajes().subscribe(viajes => {
      this.viajes = viajes;
    });

    this.viajeService.initializeWebSocketRecibirViajes();

    this.infoTaxista = this.tokenStorageService.getUser();

  }

  aceptarViaje(viaje){


    let infoViajeAceptado = {
      idTaxistaNotificacion: viaje.id,
      placa: 'ABC123',
      idUsuario: viaje.idUsuario,
      nombreTaxista: this.infoTaxista.username
    };
    console.log(infoViajeAceptado);
    this.viajeService.aceptarViaje(infoViajeAceptado).subscribe(data => {
      console.log(data);
    });
    
    // console.log(viaje);
    // console.log(this.tokenStorageService.getUser());
  }

}
