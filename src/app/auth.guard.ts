import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private angularAuth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.angularAuth.authState.pipe(
      map(user => {
        if (user) {
          return true; // User is authenticated
        } else {
          this.router.navigate(['/login']); // User is not authenticated, redirect to login
          return false;
        }
      })
    );
  }
}