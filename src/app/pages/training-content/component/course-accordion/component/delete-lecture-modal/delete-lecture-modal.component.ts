import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionsService } from '../../../../services/training-content-service';

@Component({
  selector: 'app-delete-lecture-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-lecture-modal.component.html',
  styleUrls: ['./delete-lecture-modal.component.scss']
})
export class DeleteLectureModalComponent {
  @Input() isOpen = false;
  @Input() lectureTitle: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
constructor(
    private sectionService: SectionsService ){}
  closeModal(): void {
    this.close.emit();
  }

  onConfirm(): void {

    this.confirm.emit();
    this.closeModal();
  }
}