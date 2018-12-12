import { Injectable } from '@angular/core';
import { TOKEN_API_DNI_RUC, URL_API_DNI_RUC } from '../config/config.const';
import { HttpClient, HttpParams, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class ConsultaApiDniUcService {


  constructor(private httpClient: HttpClient) { }

  consultaDNIRUC(ndoc: string, tipoDoc: number): Observable<any> {

    const token = TOKEN_API_DNI_RUC;
    const tipo = tipoDoc === 1 ? 'dni' : 'ruc';
    const nomVal = tipoDoc === 1 ? 'ndni' : 'ruc';
    let url = URL_API_DNI_RUC;
    url = url.replace('-?-', tipo);


    let params = new HttpParams();
    params = params.append(nomVal, ndoc);
    params = params.append('token', token);


    return this.httpClient.get<any>(url, { params: params })
    .pipe(
      catchError((e: HttpErrorResponse) =>  {
        const err = {error: 'No se pudo conectar con el proveedor de servicios.'};
      return throwError(err);
      })
      );

  }
}
