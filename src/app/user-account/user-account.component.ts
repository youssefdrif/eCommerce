import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { environment } from '../../environments/environment';
import firebase from 'firebase/compat/app';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-useraccount',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  signInForm: FormGroup;
  showForm = true;
  signedInUser: any = null;

  user$ = this.angularAuth.authState.pipe(
    map(user => ({ user }))
  );

  constructor(
    private formBuilder: FormBuilder,
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

  isGoogleProvider(user: any): boolean {
    return user?.providerData && user.providerData[0]?.providerId === 'google.com';
  }
  
  isPasswordProvider(user: any): boolean {
    return user?.providerData && user.providerData[0]?.providerId === 'password';
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
    this.angularAuth
      .signInWithPopup(new GoogleAuthProvider())
      .then((result) => {
        console.log('Vous vous êtes inscrit avec succès', result.user);
  
        this.signedInUser = result.user;
        this.showForm = false;
  
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
        this.router.navigate(['/signin']);
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
        // User is authenticated, set the signedInUser and hide the form
        this.signedInUser = user;
        this.showForm = false;
      } else {
        // User is not authenticated, show the form
        this.showForm = true;
      }
    });
  }
}