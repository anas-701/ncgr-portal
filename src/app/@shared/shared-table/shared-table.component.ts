import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shared-table',
  imports: [FormsModule, CommonModule],
  templateUrl: './shared-table.component.html',
  styleUrl: './shared-table.component.scss',
})
export class SharedTableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() showCheckbox = false;
  @Input() actionsTemplate?: TemplateRef<any>;
  @Input() columns: { header: string; field: string }[] = [];

  @Output() selectionChange = new EventEmitter<any[]>();

  allSelected = false;
  selectedRows: any[] = [];

  ngOnInit(): void {
    if (!this.columns.length && this.data.length) {
      this.columns = Object.keys(this.data[0])
        .filter((key) => key !== 'selected')
        .map((key) => ({
          header: this.toTitleCase(key.replace(/_/g, ' ')),
          field: key,
        }));
    }
  }

  toggleAll(): void {
    this.allSelected = !this.allSelected;
    this.data.forEach((item) => (item.selected = this.allSelected));
    this.onSelectionChange();
  }

  onSelectionChange(): void {
    this.selectedRows = this.data.filter((item) => item.selected);
    this.selectionChange.emit(this.selectedRows);
    console.log('Selected Rows:', this.selectedRows);
    console.log('Number of selected rows:', this.selectedRows.length);
  }

  getSelectedRows(): any[] {
    return this.selectedRows;
  }

  hasSelectedRows(): boolean {
    return this.selectedRows.length > 0;
  }

  private toTitleCase(str: string): string {
    return str.replace(
      /\w\S*/g,
      (txt) => txt[0].toUpperCase() + txt.slice(1).toLowerCase()
    );
  }

  clearAllSelections(): void {
    this.allSelected = false;
    this.data.forEach((item) => (item.selected = false));
    this.selectedRows = [];
    this.selectionChange.emit(this.selectedRows);
    console.log('تم إلغاء تحديد جميع العناصر');
  }
}
