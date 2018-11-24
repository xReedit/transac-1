import { Injectable } from '@angular/core';
import { MSJ_ERROR } from '../config/config.const';
import swal from 'sweetalert2';
import { RouterLink, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ManagerErrorService {

  constructor(
    private router: Router
  ) { }

  ResError(res: any) {
    const msj = res.error;
    const swal_error = MSJ_ERROR;
    swal_error.text = msj;

    switch (msj) {
      case 'Token Incorrecto.':
        swal(swal_error).then(() => {
          localStorage.clear();
          this.router.navigate(['/?']);
        });
        break;

      default:
        swal(swal_error);
        break;
    }
  }
}
