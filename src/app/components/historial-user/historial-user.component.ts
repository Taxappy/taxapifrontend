import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ViajesService } from 'src/app/services/viajes.service';

@Component({
  selector: 'app-historial-user',
  templateUrl: './historial-user.component.html',
  styleUrls: ['./historial-user.component.css']
})
export class HistorialUserComponent implements OnInit {

  viajes: any = [];

  constructor(private tokenStorageService: TokenStorageService, private viajeService: ViajesService) {
    const user = this.tokenStorageService.getUser();
    this.viajeService.getHistorialUsuario(user.identificacion).subscribe(data => {
      this.viajes = data;
    });
   }

  ngOnInit(): void {
  }

}
