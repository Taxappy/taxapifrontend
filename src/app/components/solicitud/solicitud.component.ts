import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  datos = {
    id: '',
    nombre: ''
  };

  @Output() pedirViaje = new EventEmitter<any>();

  constructor(private tokenStorageService: TokenStorageService) {
    this.pedirViaje = new EventEmitter();

    if (!!this.tokenStorageService.getToken()) {
      this.datos.id = this.tokenStorageService.getUser().identificacion;
      this.datos.nombre = this.tokenStorageService.getUser().name;
    }
  }

  ngOnInit(): void {
  }

  pedirTaxi() {
    this.pedirViaje.emit(this.datos);
  }

}
