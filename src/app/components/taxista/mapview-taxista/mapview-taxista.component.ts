import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaxistaService } from 'src/app/services/taxista.service';
import { ViajesService } from 'src/app/services/viajes.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-mapview-taxista',
  templateUrl: './mapview-taxista.component.html',
  styleUrls: ['./mapview-taxista.component.css']
})
export class MapviewTaxistaComponent implements OnInit {

  @Input() disponible = true;
  @Input() viajes: any[] = [];
  @Output() noficarViajeAceptado = new EventEmitter<any>();

  posActual = {
    lat: 6.250092011900809,
    lng: -75.5676583094607
  };

  infoTaxista: any = {
    username: ''
  };

  
  constructor(private viajeService: ViajesService, private tokenStorageService: TokenStorageService) {
    this.noficarViajeAceptado = new EventEmitter();

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
    this.infoTaxista = this.tokenStorageService.getUser();
  }

  aceptarViaje(viaje) {

    const infoViajeAceptado = {
      idTaxistaNotificacion: viaje.id,
      idUsuario: viaje.idUsuario,
      nombreTaxista: this.infoTaxista.name,
      latitud: viaje.latitud,
      longitud: viaje.longitud
    };

    this.noficarViajeAceptado.emit(infoViajeAceptado);
  }
}
