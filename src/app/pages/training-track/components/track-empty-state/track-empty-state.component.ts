import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-track-empty-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-empty-state.component.html',
  styleUrls: ['./track-empty-state.component.scss'],
})
export class TrackEmptyStateComponent {
  @Output() addTrack = new EventEmitter<void>();

  onAddTrack(): void {
    this.addTrack.emit();
  }
}
