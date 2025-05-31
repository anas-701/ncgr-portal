import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-track-toasts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-toasts.component.html',
  styleUrls: ['./track-toasts.component.scss'],
})
export class TrackToastsComponent {
  @Input() showSuccessToast = false;
  @Input() showErrorToast = false;
  @Input() successMessage = '';
  @Input() errorMessage = '';

  @Output() hideToasts = new EventEmitter<void>();

  onHideToasts(): void {
    this.hideToasts.emit();
  }
}
