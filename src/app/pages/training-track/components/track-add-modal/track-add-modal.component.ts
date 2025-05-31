import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-track-add-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './track-add-modal.component.html',
  styleUrls: ['./track-add-modal.component.scss'],
})
export class TrackAddModalComponent {
  @Input() showModal = false;
  @Input() trackForm!: FormGroup;
  @Input() processingForm = false;
  @Input() formError = '';
  @Input() formSuccess = '';

  @Output() closeModal = new EventEmitter<void>();
  @Output() createTrack = new EventEmitter<void>();
  @Output() updateStatus = new EventEmitter<Event>();

  onClose(): void {
    this.closeModal.emit();
  }

  onCreate(): void {
    this.createTrack.emit();
  }

  onUpdateStatus(event: Event): void {
    this.updateStatus.emit(event);
  }
}
