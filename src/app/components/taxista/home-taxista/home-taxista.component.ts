import { Component, OnInit } from '@angular/core';
import { TaxiService } from 'src/app/services/taxi.service';
import { TokenStorageService } from '../../../services/token-storage.service';
import { TaxistaService } from 'src/app/services/taxista.service';

@Component({
  selector: 'app-home-taxista',
  templateUrl: './home-taxista.component.html',
  styleUrls: ['./home-taxista.component.css']
})
export class HomeTaxistaComponent implements OnInit {

  taxis: any[] = [];
  placaTaxi = '';

  constructor(private taxiService: TaxiService, private tokenStorageService: TokenStorageService,
    private taxistaService: TaxistaService) { }

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    if (user.taxi) {
      this.placaTaxi = user.taxi;
      this.mostrarMapa();
    } else {
      document.getElementById('seleccion-taxi').style.transition = '1s all';
      document.getElementById('mapa-viajes').style.transition = '1s all';
      this.taxiService.getAllTaxi().subscribe(taxis => {
        this.taxis = taxis;
      });
    }
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

}
