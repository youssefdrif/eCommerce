import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { environment } from '../../environments/environment';
import firebase from 'firebase/compat/app';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  showForm = true;
  signedInUser: any = null;

  user$ = this.angularAuth.authState.pipe(
    map(user => ({ user }))
  );

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private angularAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router,
    private alertController: AlertController
  ) {
    firebase.initializeApp(environment.firebaseConfig);
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
    });
    this.angularAuth.onAuthStateChanged((user) => {
      if (user) {
        this.signedInUser = user;
        this.showForm = false;
        this.userService.setUser(user);
      } else {
        this.showForm = true;
      }
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
  
  getInitialFromEmail(email: string | undefined | null): string {
    if (email) {
      return email.charAt(0).toUpperCase();
    }
    return '';
  }  

  onSignInClick() {
    this.angularAuth
      .signInWithPopup(new GoogleAuthProvider())
      .then((result) => {
        console.log('Vous vous êtes inscrit avec succès', result.user);
  
        this.signedInUser = result.user;
        this.showForm = false;
        this.router.navigate(['/user-account']);
        this.presentAlert('Succès', 'Vous vous êtes inscrit avec succès', 'success');
      })
      .catch((error) => {
        console.log(error);
  
        this.presentAlert(
          'Erreur',
          "Une erreur est survenue lors de l'inscription",
          'danger'
        );
      });
  }  

  onSignOutClick() {
    this.angularAuth
      .signOut()
      .then(() => {
        this.signedInUser = null;
        this.showForm = true;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onEmailLogoutClick() {
    this.angularAuth
      .signOut()
      .then(() => {
        this.signedInUser = null;
        this.showForm = true;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  signIn() {
    const { email, password, name, surname } = this.signInForm.value;

    this.angularAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('Vous vous êtes inscrit avec succès', userCredential.user);

        this.signedInUser = {
          displayName: `${name} ${surname}`,
          email: userCredential.user?.email,
        };

        this.showForm = false;
        console.log('fkoekfe');
        this.router.navigate(['/','user-account']);

        this.presentAlert("Succès", 'Vous vous êtes inscrit avec succès', 'success');
      })
      .catch((error) => {
        console.log(error);

        this.presentAlert('Erreur', "Une erreur est survenue lors de l'inscription", 'danger');
      });
  }

  async presentAlert(header: string, message: string, color: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [{
        text: 'OK',
        cssClass: 'custom-alert-button'
      }],
      cssClass: 'custom-alert',
      backdropDismiss: false,
      translucent: true
    });
  
    const alertElement = await alert;
    if (alertElement) {
      const colorClass = `alert-color-${color}`;
      alertElement.classList.add(colorClass);
    }
    await alert.present();
  }

  ngOnInit() {
    this.angularAuth.onAuthStateChanged((user) => {
      if (user) {
        this.signedInUser = user;
        this.showForm = false;
      } else {
        this.showForm = true;
      }
    });
  }
}