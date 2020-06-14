import { Component, OnInit } from "@angular/core";
import { TaxistaService } from "../../../services/taxista.service";
import { AuthService } from "../../../services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-taxista-oflist",
  templateUrl: "./taxista-oflist.component.html",
  styleUrls: ["./taxista-oflist.component.css"],
})
export class TaxistaOFListComponent implements OnInit {
  constructor(
    private serviceTaxista: TaxistaService,
    private authservices: AuthService
  ) {}

  TaxistasB2 = [];
  ArrayTaxista = [];

  ngOnInit(): void {
    this.serviceTaxista.getAllTaxista().subscribe((data) => {
      this.TaxistasB2 = data;
      // console.log(this.TaxistasB2);
      for (let index = 0; index < this.TaxistasB2.length; index++) {
        const identificacionTaxista = this.TaxistasB2[index].idTaxista;
        this.serviceTaxista
          .getONETaxistaBLog(identificacionTaxista)
          .subscribe((taxistaData) => {
            this.ArrayTaxista.push(taxistaData);
            console.log(this.ArrayTaxista);
          });
      }
    });
  }

  EliminarTaxis(id, identificacion) {
    this.authservices.deleteProfileB1(id).subscribe((data) => {
      this.authservices.deleteTaxistaB2(identificacion).subscribe((dataB2) => {
        Swal.fire({
          icon: "success",
          title: "Taxista eliminado satisfactoriamente",
          showConfirmButton: false,
          timer: 2500,
        });
        window.location.reload();
      });
    });
  }
}
