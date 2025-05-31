import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-track-cant-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-cant-delete-modal.component.html',
  styleUrls: ['./track-cant-delete-modal.component.scss'],
})
export class TrackCantDeleteModalComponent {
  @Input() showModal = false;
  @Output() closeModal = new EventEmitter<void>();

  onClose(): void {
    this.closeModal.emit();
  }
}
