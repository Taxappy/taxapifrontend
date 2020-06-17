import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaxiService } from 'src/app/services/taxi.service';
import { TokenStorageService } from '../../../services/token-storage.service';
import { TaxistaService } from 'src/app/services/taxista.service';
import { ViajesService } from 'src/app/services/viajes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-taxista',
  templateUrl: './home-taxista.component.html',
  styleUrls: ['./home-taxista.component.css']
})
export class HomeTaxistaComponent implements OnInit, OnDestroy {

  taxis: any[] = [];
  placaTaxi = '';
  disponible = true;
  viaje: any = {};
  viajes: any = [];
  infoTaxista: any = {};

  constructor(private taxiService: TaxiService, private tokenStorageService: TokenStorageService,
    private taxistaService: TaxistaService, private viajeService: ViajesService) { }

  ngOnInit(): void {
    this.infoTaxista = this.tokenStorageService.getUser();
    if (this.infoTaxista.taxi) {
      this.placaTaxi = this.infoTaxista.taxi;
      this.mostrarMapa();
    } else {
      document.getElementById('seleccion-taxi').style.transition = '1s all';
      document.getElementById('mapa-viajes').style.transition = '1s all';
      this.taxiService.getAllTaxi().subscribe(taxis => {
        this.taxis = taxis;
      });
    }

    this.inicializarProcesoViajes();



  }

  inicializarProcesoViajes() {
    this.viajeService.viajes$.subscribe(viajes => {
      if (this.disponible) {
        if ((this.viajes.length - 1) != JSON.parse(viajes).length ) {
          Swal.fire({
            // icon: 'success',
            imageUrl: '../../../assets/Persona-Icono.png',
            imageWidth: 150,
            imageHeight: 150,
            title: '¿Me recoges?',
            showConfirmButton: false,
            timer: 3000
          });
        }
        this.viajes = JSON.parse(viajes);
      }

    });

    this.viajeService.getAllViajes().subscribe(viajes => {
      this.viajes = viajes;
      if (!this.taxistaService.getViajeActual()) {
        this.taxistaService.setViajeActual();
      } else {
        this.viaje = this.taxistaService.getViajeActual();
        if (this.viaje != JSON.stringify({})) {
          this.viajes = [this.viaje];
          this.disponible = false;
        }
      }
    });

    this.viajeService.initializeWebSocketRecibirViajes();


  }

  seleccionarTaxi(taxi) {
    const user = this.tokenStorageService.getUser();
    user.taxi = taxi.placa;
    this.notificarUsoTaxi(user);
  }

  notificarUsoTaxi(user) {
    const usoTaxi = {
      idTaxista: user.identificacion,
      placa: user.taxi,
      fechaUso: this.obtenerFecha()
    };
    this.taxistaService.usarTaxi(usoTaxi).subscribe(data => {
      this.tokenStorageService.saveUser(user);
      this.placaTaxi = user.taxi;
      this.mostrarMapa();
    });
  }

  obtenerFecha() {
    const fecha = new Date();
    const dd = fecha.getDate();
    const mm = fecha.getMonth() + 1;
    const yyyy = fecha.getFullYear();
    return dd + '-' + mm + '-' + yyyy;
  }

  mostrarMapa() {
    document.getElementById('mapa-viajes').style.position = 'relative';
    document.getElementById('seleccion-taxi').style.position = 'absolute';
    document.getElementById('seleccion-taxi').style.left = '-100%';
    document.getElementById('mapa-viajes').style.left = '0%';
  }

  aceptarViaje(viaje) {
    viaje.placa = this.placaTaxi;
    this.viajeService.aceptarViaje(viaje).subscribe(data => {
      this.viaje = data;
      this.viaje.latitud = viaje.latitud;
      this.viaje.longitud = viaje.longitud;
      this.disponible = false;
      this.taxistaService.setViajeActual(this.viaje);
      this.viajes = [this.viaje];
      Swal.fire({
        icon: 'success',
        title: 'El viaje ha iniciado',
        showConfirmButton: false,
        timer: 4000
      });
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salió mal',
        timer: 4000
      });
    });
  }

  finalizarViaje() {
    this.viaje = this.taxistaService.getViajeActual();
    const guardarViaje = {
      idUsuario: this.viaje.idUsuario,
      idTaxista: this.infoTaxista.identificacion,
      fechaViaje: this.obtenerFecha(),
      estado: 'Aceptado',
      latitud: this.viaje.latitud,
      longitud: this.viaje.longitud
    };
    this.viajeService.guardarViaje(guardarViaje).subscribe(data => {
      this.disponible = true;
      this.taxistaService.setViajeActual();
      this.viajeService.getAllViajes().subscribe(viajes => {
        this.viajes = viajes;
        Swal.fire({
          icon: 'success',
          title: 'El viaje ha finalizado satisfactoriamente.',
          showConfirmButton: false,
          timer: 4000
        });
      }, err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal',
          timer: 4000
        });
      });
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salió mal',
        timer: 4000
      });
    });
  }

  ngOnDestroy() {
    delete this.viajeService;
  }

}
