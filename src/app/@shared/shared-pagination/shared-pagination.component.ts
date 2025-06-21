import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PagingMetaData } from '../../@models/shared/paging-meta-data.model';

@Component({
  selector: 'app-shared-pagination',
  imports: [CommonModule],
  templateUrl: './shared-pagination.component.html',
  styleUrl: './shared-pagination.component.scss'
})
export class SharedPaginationComponent {
  @Input() pagingMetaData: PagingMetaData = {} as PagingMetaData;
  @Output() pageChange = new EventEmitter<number>();

  onPageChange(page: number): void {
    if (page < 1 || page > this.pagingMetaData.pageCount) {
      return;
    }
    this.pageChange.emit(page);
  }
}
