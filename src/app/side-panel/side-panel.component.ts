// side-panel.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent {
  @Input() isOpen: boolean = false;
  @Output() closePanelEvent: EventEmitter<void> = new EventEmitter<void>();

  closePanel() {
    this.closePanelEvent.emit();
  }
  constructor(private router: Router) { }

  redirectToPage() {
    this.router.navigateByUrl('/login');
  }
}
