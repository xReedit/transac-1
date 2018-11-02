import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioStorageService {

  constructor() { }

  saveUsuario ( usuario: any): void {
    localStorage.setItem('wt::u', JSON.stringify(usuario));
  }
}
