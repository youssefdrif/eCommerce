import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { environment } from '../../environments/environment';
import firebase from 'firebase/compat/app';
import { map } from 'rxjs/operators'; 

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  
  user$ = this.angularAuth.authState.pipe(
    map(user => ({ user }))
  );
    
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private angularAuth: AngularFireAuth) {
    firebase.initializeApp(environment.firebaseConfig);
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
    
  getInitial(displayName: string | null | undefined): string {
    if (displayName) {
      const initials = displayName
        .split(' ')
        .map(name => name.charAt(0).toUpperCase())
        .join('');
      return initials.substring(0, 2);
    }
    return '';
  }
    
  onSignInClick() {
    this.angularAuth.signInWithPopup(new GoogleAuthProvider()).then(() => {
      console.log('Successfully signed in!');
    }).catch((error) => {
      console.log(error);
    });
  }

  onSignOutClick() {
    this.angularAuth.signOut();
  }

  signIn() {
    const { email, password } = this.signInForm.value;
    console.log('Email:', email); // Check the captured email in the console
  
    this.angularAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Sign-in successful
        console.log('Successfully signed in!', userCredential.user);
      })
      .catch((error) => {
        // Handle sign-in error
        console.log(error);
      });
  }  
  
  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }  
}