import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSignIn() {
    if (this.signInForm.invalid) {
      // Handle form validation errors
      return;
    }

    const email = this.signInForm.get('email')?.value;
    const password = this.signInForm.get('password')?.value;

    // Call your authentication service's sign-in method
    this.authService.signIn(email, password)
      .then((response: any) => {
        // Handle successful sign-in
        console.log('Sign-in successful');
      })
      .catch((error: any) => {
        // Handle sign-in error
        console.error('Sign-in failed', error);
      });
  }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
}
