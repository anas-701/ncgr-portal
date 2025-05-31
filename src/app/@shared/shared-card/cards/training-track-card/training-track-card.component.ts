import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TrackCardData {
  id: number;
  titleAr: string;
  titleEn: string;
  isArabic: boolean;
  isEnglish: boolean;
  statusName: string;
  statusId?: number;
  trainingProgramsCount?: number;
  generalProgramsCount?: number;
}

@Component({
  selector: 'app-training-track-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './training-track-card.component.html',
  styleUrl: './training-track-card.component.scss',
})
export class TrainingTrackCardComponent implements OnInit {
  @Input() data: TrackCardData = {
    id: 0,
    titleAr: '',
    titleEn: '',
    isArabic: false,
    isEnglish: false,
    statusName: ' ',
    statusId: 1,
    trainingProgramsCount: 0,
    generalProgramsCount: 0,
  };
  @Output() edit = new EventEmitter<number>();
  @Output() view = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() statusChange = new EventEmitter<{ id: number; statusId: number }>();

  statuses = [
    { id: 1, name: 'مفعل' },
    { id: 2, name: 'غير مفعل' },
  ];

  currentStatus = 1;
  isProcessing = false;

  ngOnInit() {
    this.currentStatus =
      this.data.statusId || (this.data.statusName === 'مفعل' ? 1 : 2);
  }

  onEdit() {
    this.edit.emit(this.data.id);
  }

  onView() {
    this.view.emit(this.data.id);
  }

  onDelete() {
    this.delete.emit(this.data.id);
  }

  onStatusChange(event: any) {
    const newStatusId = parseInt(event.target.value);
    if (newStatusId && newStatusId !== this.currentStatus) {
      this.isProcessing = true;
      this.statusChange.emit({
        id: this.data.id,
        statusId: newStatusId,
      });
    }
  }
}
