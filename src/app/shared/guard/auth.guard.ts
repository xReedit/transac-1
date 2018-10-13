import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(){
    // next: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // return true;

    const currentUserName = localStorage.getItem('currentUserName');
    if (currentUserName) {
      return true;
    }


    this.router.navigate(['/session/login']);
    return false;
  }
}
