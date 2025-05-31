import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-track-edit-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './track-edit-modal.component.html',
  styleUrls: ['./track-edit-modal.component.scss'],
})
export class TrackEditModalComponent {
  @Input() showModal = false;
  @Input() trackForm!: FormGroup;
  @Input() processingForm = false;
  @Input() formError = '';
  @Input() formSuccess = '';

  @Output() closeModal = new EventEmitter<void>();
  @Output() saveTrack = new EventEmitter<void>();
  @Output() updateStatus = new EventEmitter<Event>();

  onClose(): void {
    this.closeModal.emit();
  }

  onSave(): void {
    this.saveTrack.emit();
  }

  onUpdateStatus(event: Event): void {
    this.updateStatus.emit(event);
  }
}
