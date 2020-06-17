import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../services/token-storage.service';
import { ViajesService } from 'src/app/services/viajes.service';

@Component({
  selector: 'app-historial-taxista',
  templateUrl: './historial-taxista.component.html',
  styleUrls: ['./historial-taxista.component.css']
})
export class HistorialTaxistaComponent implements OnInit {

  viajes: any = [];

  constructor(private tokenStorageService: TokenStorageService, private viajeService: ViajesService) {
    const user = this.tokenStorageService.getUser();
    this.viajeService.getHistorialTaxista(user.identificacion).subscribe(data => {
      this.viajes = data;
    });
  }

  ngOnInit(): void {
  }

}
