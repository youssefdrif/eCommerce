import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserCredential } from '@firebase/auth-types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private angularAuth: AngularFireAuth) {}

  signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    return this.angularAuth.signInWithEmailAndPassword(email, password);
  }
}