import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs'; // Make sure you import Observable

import { UserService } from '../user.service'; // Adjust the path accordingly

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  sidePanelOpen: boolean = false;
  user$: Observable<any>;
  user: any; // Declare the user property

  constructor(private angularAuth: AngularFireAuth, private userService: UserService) {
    this.user$ = this.angularAuth.authState;
    this.userService.user$.subscribe(user => this.user = user);
  }

  ngOnInit() {}

  openSidePanel() {
    this.sidePanelOpen = true;
  }

  onSidePanelClose() {
    this.sidePanelOpen = false;
  }
}