import { Injectable } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioStorageService {

  constructor() { }

  saveUsuario ( usuario: any): void {
    localStorage.setItem('wt::u', JSON.stringify(usuario));
  }

  getUsuario(): UsuarioModel {
    return <UsuarioModel>JSON.parse(localStorage.getItem('wt::u'));
  }
}
