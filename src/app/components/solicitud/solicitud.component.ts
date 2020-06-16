import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  constructor() {
    this.pedirViaje = new EventEmitter();
   }

  ngOnInit(): void {
  }

  pedirTaxi() {
    this.pedirViaje.emit(this.datos);
  }

}
