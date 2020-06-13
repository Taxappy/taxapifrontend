import { Component, OnInit } from "@angular/core";
import { TaxiService } from "../../../services/taxi.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-taxi-home",
  templateUrl: "./taxi-home.component.html",
  styleUrls: ["./taxi-home.component.css"],
})
export class TaxiHomeComponent implements OnInit {
  formTaxi: any = {};
  constructor(private taxiList: TaxiService) {}

  ngOnInit(): void {}

  postTaxi() {
    this.taxiList.postTaxi(this.formTaxi).subscribe(
      (data) => {
        Swal.fire({
          icon: "success",
          title: "Taxi registrado satisfactoriamente",
          showConfirmButton: false,
          timer: 2500,
        });
        this.taxiList.taxi$.emit(data);
      },
      (err) => {
        Swal.fire({
          icon: "error",
          title: "Error al registrar T",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    );
  }
}
