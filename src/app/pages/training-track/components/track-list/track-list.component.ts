import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingTrackCardComponent } from '../../../../@shared/shared-card/cards/training-track-card/training-track-card.component';
import { ProgramPath } from '../../model/program-paths-response.model';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [CommonModule, TrainingTrackCardComponent],
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss'],
})
export class TrackListComponent {
  @Input() trainingTracks: ProgramPath[] = [];
  @Output() editTrack = new EventEmitter<number>();
  @Output() viewDetails = new EventEmitter<number>();
  @Output() deleteTrack = new EventEmitter<number>();
  @Output() statusChangeTrack = new EventEmitter<{
    id: number;
    statusId: number;
  }>();

  onEdit(id: number): void {
    this.editTrack.emit(id);
  }

  onView(id: number): void {
    this.viewDetails.emit(id);
  }

  onDelete(id: number): void {
    this.deleteTrack.emit(id);
  }

  onStatusChange(data: { id: number; statusId: number }): void {
    this.statusChangeTrack.emit(data);
  }
}
