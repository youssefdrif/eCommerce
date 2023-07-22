import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { environment } from '../../environments/environment';
import firebase from 'firebase/compat/app';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

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
    private alertController: AlertController
  ) {
    firebase.initializeApp(environment.firebaseConfig);
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
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
    this.angularAuth.signInWithPopup(new GoogleAuthProvider()).then((result) => {
      console.log('Successfully signed in!', result.user);

      this.signedInUser = result.user;
      this.showForm = false;

      this.presentAlert('Success', 'Successfully signed in!', 'success');
    }).catch((error) => {
      console.log(error);

      this.presentAlert('Error', 'An error occurred while signing in.', 'danger');
    });
  }

  onSignOutClick() {
    this.angularAuth.signOut().then(() => {
      this.signedInUser = null;
      this.showForm = true;
    }).catch((error) => {
      console.log(error);
    });
  }

  signIn() {
    const { email, password, name, surname } = this.signInForm.value;

    this.angularAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('Successfully signed in!', userCredential.user);

        this.signedInUser = {
          displayName: `${name} ${surname}`,
          email: userCredential.user?.email,
        };

        this.showForm = false;

        this.presentAlert('Success', 'Successfully signed in!', 'success');
      })
      .catch((error) => {
        console.log(error);

        this.presentAlert('Error', 'An error occurred while signing in.', 'danger');
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
    // No need to initialize the form again here, as it's already done in the constructor
  }
}