import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilesService {

  constructor() { }

  getDateString(fecha: any): any {
    fecha = fecha === null ? new Date() : fecha;
    const today = fecha;
    const d = today;
    const m = today.getMonth() + 1;
    const mes = (m < 10) ? '0' + m : m;
    const yy = today.getFullYear();
    // const year = (yy < 1000) ? yy + 1900 : yy;

    // const sFecha = today.getDate() + '/' + mes + '/' + year;

    return [today.getDate(), mes, yy].join('/');

  }
}
