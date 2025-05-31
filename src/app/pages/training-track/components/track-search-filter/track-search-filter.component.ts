import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface FilterOptions {
  status: number;
  language: string;
  sortOrder: 'asc' | 'desc' | 'none';
  searchText: string;
}

@Component({
  selector: 'app-track-search-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './track-search-filter.component.html',
  styleUrls: ['./track-search-filter.component.scss'],
})
export class TrackSearchFilterComponent {
  @Output() filterStatus = new EventEmitter<number>();
  @Output() filterLanguage = new EventEmitter<string>();
  @Output() sortPrograms = new EventEmitter<string>();
  @Output() search = new EventEmitter<string>();
  @Output() applyFilters = new EventEmitter<FilterOptions>();

  searchText = '';
  activeStatusFilter = 0;
  activeLanguageFilter = 'ar';
  sortOrder: 'asc' | 'desc' | 'none' = 'none';

  private searchSubject = new Subject<string>();

  // State for checkboxes
  statusChecked = {
    active: false,
    inactive: false,
  };

  languageChecked = {
    ar: false,
    en: false,
  };

  constructor() {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.search.emit(searchTerm);
        this.applyAllFilters();
      });
  }

  onFilterStatus(statusId: number): void {
    if (statusId === 1) {
      this.statusChecked.active = !this.statusChecked.active;
      if (this.statusChecked.active) {
        this.activeStatusFilter = 1;
      } else {
        this.activeStatusFilter = 0;
      }
    } else if (statusId === 2) {
      this.statusChecked.inactive = !this.statusChecked.inactive;
      if (this.statusChecked.inactive) {
        this.activeStatusFilter = 2;
      } else {
        this.activeStatusFilter = 0;
      }
    }

    // Uncheck the other status if this one is checked
    if (statusId === 1 && this.statusChecked.active) {
      this.statusChecked.inactive = false;
    } else if (statusId === 2 && this.statusChecked.inactive) {
      this.statusChecked.active = false;
    }

    // إرسال حدث الفلترة
    this.filterStatus.emit(this.activeStatusFilter);
  }

  onFilterLanguage(lang: string): void {
    if (lang === 'ar') {
      this.languageChecked.ar = !this.languageChecked.ar;
      if (this.languageChecked.ar) {
        this.activeLanguageFilter = 'ar';
      }
    } else if (lang === 'en') {
      this.languageChecked.en = !this.languageChecked.en;
      if (this.languageChecked.en) {
        this.activeLanguageFilter = 'en';
      }
    }

    // Uncheck the other language if this one is checked
    if (lang === 'ar' && this.languageChecked.ar) {
      this.languageChecked.en = false;
    } else if (lang === 'en' && this.languageChecked.en) {
      this.languageChecked.ar = false;
    }

    // إرسال حدث الفلترة
    this.filterLanguage.emit(this.activeLanguageFilter);
  }

  onSortPrograms(order: 'asc' | 'desc'): void {
    this.sortOrder = order;
    // إرسال حدث الترتيب
    this.sortPrograms.emit(order);
  }

  onSearch(): void {
    // استخدام Subject للبحث مع التأخير
    this.searchSubject.next(this.searchText);
  }

  applyAllFilters(): void {
    const filters: FilterOptions = {
      status: this.activeStatusFilter,
      language: this.activeLanguageFilter,
      sortOrder: this.sortOrder,
      searchText: this.searchText,
    };

    // إرسال جميع الفلاتر دفعة واحدة
    this.applyFilters.emit(filters);
  }

  resetFilters(): void {
    this.searchText = '';
    this.activeStatusFilter = 0;
    this.activeLanguageFilter = 'ar';
    this.sortOrder = 'none';
    this.statusChecked = { active: false, inactive: false };
    this.languageChecked = { ar: false, en: false };

    // Reset UI elements
    const ascRadio = document.getElementById(
      'flexRadioDefault1'
    ) as HTMLInputElement;
    const descRadio = document.getElementById(
      'flexRadioDefault2'
    ) as HTMLInputElement;
    if (ascRadio) ascRadio.checked = false;
    if (descRadio) descRadio.checked = false;

    // إعادة تعيين البحث وتطبيق الفلاتر
    this.searchSubject.next('');
    this.applyAllFilters();
  }
}
