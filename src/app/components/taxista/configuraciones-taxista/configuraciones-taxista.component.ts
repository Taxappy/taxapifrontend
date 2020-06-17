import { Component, OnInit } from '@angular/core';
import { TaxiService } from 'src/app/services/taxi.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { TaxistaService } from 'src/app/services/taxista.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configuraciones-taxista',
  templateUrl: './configuraciones-taxista.component.html',
  styleUrls: ['./configuraciones-taxista.component.css']
})
export class ConfiguracionesTaxistaComponent implements OnInit {

  taxis: any = [];
  placa = '';
  taxista: any = {};

  constructor(private taxiService: TaxiService, private tokenStorageService: TokenStorageService,
    private taxistaService: TaxistaService) { }

  ngOnInit(): void {
    this.taxiService.getAllTaxi().subscribe(taxis => {
      this.taxis = taxis;
    });
    this.taxista = this.tokenStorageService.getUser();
    if (this.taxista.taxi) {
      this.placa = this.taxista.taxi;
    }
  }

  seleccionarTaxi(taxi) {
    if (this.taxistaService.getViajeActual() != null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No puedes cambiar de taxi si estás haciendo un viaje.',
        timer: 4000
      });
      return;
    }
    this.taxista.taxi = taxi.placa;
    this.notificarUsoTaxi(this.taxista);
  }

  notificarUsoTaxi(user) {
    const usoTaxi = {
      idTaxista: user.identificacion,
      placa: user.taxi,
      fechaUso: this.obtenerFecha()
    };
    this.taxistaService.usarTaxi(usoTaxi).subscribe(data => {
      this.tokenStorageService.saveUser(user);
      this.placa = user.taxi;
      Swal.fire({
        icon: 'success',
        title: 'Ha cambiado de taxi exitosamente',
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

  obtenerFecha() {
    const fecha = new Date();
    const dd = fecha.getDate();
    const mm = fecha.getMonth() + 1;
    const yyyy = fecha.getFullYear();
    return dd + '-' + mm + '-' + yyyy;
  }


}
