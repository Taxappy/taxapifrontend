import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-historial-viajes',
  templateUrl: './historial-viajes.component.html',
  styleUrls: ['./historial-viajes.component.css']
})
export class HistorialViajesComponent implements OnInit {

  @Input() viajes: any = [];
  @Output() cancelar = new EventEmitter<any>();

  mapaViaje: any = {
    latitud: 6.250092011900809,
    longitud: -75.5676583094607
  };
  constructor() {
    this.cancelar = new EventEmitter();
  }

  ngOnInit(): void {
  }

  mostrarMapa(i) {
    this.mapaViaje = this.viajes[i];
  }

  cancelarViaje(viaje) {
    this.cancelar.emit(viaje);
  }

}
