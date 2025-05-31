import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-track-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-pagination.component.html',
  styleUrls: ['./track-pagination.component.scss'],
})
export class TrackPaginationComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.pageChange.emit(page);
  }
}
