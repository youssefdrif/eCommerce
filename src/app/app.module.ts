import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SigninComponent } from './signin/signin.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth"
import { environment } from 'src/environments/environment';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { UserAccountComponent } from './user-account/user-account.component';
import { AuthGuard } from './auth.guard';
import { UserService } from './user.service';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'sidepanel', component: SidePanelComponent },
  { path: 'user-account', component: UserAccountComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    SigninComponent,
    SidePanelComponent,
    UserAccountComponent,
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    IonicModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
