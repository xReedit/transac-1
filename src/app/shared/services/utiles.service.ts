import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

  stringToDate(_date, _format, _delimiter) {
    const formatLowerCase = _format.toLowerCase();
    const formatItems = formatLowerCase.split(_delimiter);
    const dateItems = _date.split(_delimiter);
    const monthIndex = formatItems.indexOf('mm');
    const dayIndex = formatItems.indexOf('dd');
    const yearIndex = formatItems.indexOf('yyyy');
    let month = parseInt(dateItems[monthIndex], 2);
    month -= 1;
    const formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    return formatedDate;
  }

  setearFormulario (form: FormGroup, data: any): FormGroup {
    Object.keys(data).forEach(name => {
      if (form.controls[name]) {
        form.controls[name].patchValue(data[name]);
      }
    });

    return form;
  }
}
