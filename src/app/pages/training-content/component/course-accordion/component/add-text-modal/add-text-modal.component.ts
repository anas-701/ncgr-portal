import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-text-modal',
  imports: [FormsModule],
  templateUrl: './add-text-modal.component.html',
  styleUrl: './add-text-modal.component.scss'
})
export class AddTextModalComponent {
  @Input() isOpen = false;
  @Input() lectureTitle = '';
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<string>();

  newText = '';

  closeModal(): void {
    this.close.emit();
  }

  onSave(): void {
    this.save.emit(this.newText);
    this.closeModal();
  }
}
