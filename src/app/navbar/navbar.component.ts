import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  sidePanelOpen: boolean = false;
  user$: Observable<any>;
  user: any;

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