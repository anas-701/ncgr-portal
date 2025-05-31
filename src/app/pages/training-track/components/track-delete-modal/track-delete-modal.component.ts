import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramPath } from '../../model/program-paths-response.model';

@Component({
  selector: 'app-track-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-delete-modal.component.html',
  styleUrls: ['./track-delete-modal.component.scss'],
})
export class TrackDeleteModalComponent {
  @Input() showModal = false;
  @Input() track: ProgramPath | null = null;
  @Input() processingDelete = false;
  @Input() deleteError = '';
  @Input() deleteSuccess = '';

  @Output() closeModal = new EventEmitter<void>();
  @Output() confirmDelete = new EventEmitter<void>();

  onClose(): void {
    this.closeModal.emit();
  }

  onConfirmDelete(): void {
    this.confirmDelete.emit();
  }
}
