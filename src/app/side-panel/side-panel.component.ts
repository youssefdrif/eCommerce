// side-panel.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

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
}
