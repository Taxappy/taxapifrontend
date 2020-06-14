import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isAdmin = false;
  isLoggedIn = false;
  private roles: string[];

  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

  onSubmit() {
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();

      this.roles = user.roles;
      this.isAdmin = this.roles.includes('ROLE_ADMIN');

      if (!this.isAdmin) {
        Swal.fire({
          icon: 'error',
          title: 'No tiene permisos para realizar esta operación',
          showConfirmButton: false,
          timer: 2500
        });
        return;
      }
    } else {
      this.form.role = 'user';
    }
    this.form.role = [this.form.role];
    this.authService.register(this.form ).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        Swal.fire({
          icon: 'success',
          title: 'Su registro ha sido exitoso',
          showConfirmButton: false,
          timer: 2500
        });
      },
      err => {
        this.isSignUpFailed = true;
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar usuario',
          showConfirmButton: false,
          timer: 2500
        });
      }
    );

  }

}
