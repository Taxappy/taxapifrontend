import { Component, OnInit } from '@angular/core';
import { TaxiService } from '../../../services/taxi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-taxi',
  templateUrl: './list-taxi.component.html',
  styleUrls: ['./list-taxi.component.css']
})
export class ListTaxiComponent implements OnInit {

  taxis = [];


  constructor(private taxiList: TaxiService) {
    this.getTaxis();
  }

  ngOnInit(): void {
    this.taxiList.taxi$.subscribe(data => {
      this.taxis.push(data);
    })
  }

  getTaxis() {
    this.taxiList.getAllTaxi().subscribe(data => {
      this.taxis = data;
    });
  }

  deleteTaxi(placa, i) {
    this.taxiList.deleteTaxi(placa).subscribe(data => {
      this.taxis.splice(i , 1 ) ;
      Swal.fire({
        icon: 'success',
        title: 'Taxi eliminado satisfactoriamente',
        showConfirmButton: false,
        timer: 2500
      });
    },
    err => {
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar satisfactoriamente',
        showConfirmButton: false,
        timer: 2500
      });
    });

  }



}
