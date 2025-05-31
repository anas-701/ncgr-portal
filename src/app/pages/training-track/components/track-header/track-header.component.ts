import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-track-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-header.component.html',
  styleUrls: ['./track-header.component.scss'],
})
export class TrackHeaderComponent {
  @Output() addTrack = new EventEmitter<void>();

  onAddTrack(): void {
    this.addTrack.emit();
  }
}
