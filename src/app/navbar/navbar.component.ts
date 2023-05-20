// navbar.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  sidePanelOpen: boolean = false;

  openSidePanel() {
    this.sidePanelOpen = true;
  }

  onSidePanelClose() {
    this.sidePanelOpen = false;
  }
}
