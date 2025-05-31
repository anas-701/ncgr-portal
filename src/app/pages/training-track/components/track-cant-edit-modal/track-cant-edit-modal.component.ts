import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-track-cant-edit-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-cant-edit-modal.component.html',
  styleUrls: ['./track-cant-edit-modal.component.scss'],
})
export class TrackCantEditModalComponent {
  @Input() showModal = false;
  @Output() closeModal = new EventEmitter<void>();

  onClose(): void {
    this.closeModal.emit();
  }
}
