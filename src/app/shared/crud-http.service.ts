import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_SERVER } from './config/config.const';

@Injectable()
export class CrudHttpService {
    
  constructor(private httpClient: HttpClient) {
    
   }

  // conOrg, conSede FILTRAN SI NO SE ESPECIFICA POR ORG Y SEDE 
  getAll(controller: string, evento: string, conOrg:boolean=true, conSede: boolean=true): Observable<any[]> {
    const url = this.setUrl(controller, evento, conOrg, conSede);
    return this.httpClient.get<any[]>(url);
  }

  // numeropagina: numero pagina a mostrar
  // rows: cantidad de filas o registros a mostrar
  // filter: filtros de busqueda para la paginacion // se adjunta a org y sede
  // orden: nombre del campo por el cual se ordenara
  // ordendireccion: default ASC
  paginacion(controller: string, evento: string, pagenumber:number, rows: number, filter: string, orden: string, ordendireccion:string=null, conOrg:boolean=true, conSede: boolean=true): Observable<any[]> {
    const url = this.setUrl(controller, evento, conOrg, conSede, filter);
    const params = new HttpParams({
      fromObject: {
        pagenumber: pagenumber.toString(),
        rows: rows.toString(),
        orden: orden,
        ordendireccion: ordendireccion || ''
      }
    });
    return this.httpClient.get<any[]>(url, {params:params});
  }

  private setUrl(controller: string, evento: string, conOrg:boolean, conSede: boolean, filter: string=''): string {
    const getSede = conSede ? this.setInfoSedeToken() : '';
    const getOrg = conOrg ? this.setInfoOrgToken() : '';
    const getOperador = (conOrg && conSede) ? '-y-' : '';
    const getFilter = filter === '' ? '' : `-y-${filter}`
    let filterOrgSede = `${getSede+getOperador+getOrg}`;

    filterOrgSede = filterOrgSede !== "" ? '/getFilterBy/'+filterOrgSede+getFilter : '';
    

    const url = `${URL_SERVER}/${controller}/${evento}${filterOrgSede}`;
    return url;
  }

  private setInfoSedeToken(): string {    
    return 'idsede=1';
  }
  private setInfoOrgToken(): string {    
    return 'idorg=1';
  }

}
