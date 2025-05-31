import { Component, OnInit } from '@angular/core';
import { Course, COURSES } from '../constants/courses.constant';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { CommonModule } from '@angular/common';
import { TrainingTrackService } from './services/training-track.service';
import { Router, RouterLink } from '@angular/router';
import { TrainingTrackCardComponent } from '../../@shared/shared-card/cards/training-track-card/training-track-card.component';
import { WorkshopsCardComponent } from '../workshops-card/workshops-card.component';
import {
  OrderByValue,
  ProgramPath,
  ProgramPathsResponse,
} from './model/program-paths-response.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { TrackCreateRequest } from './model/track-create-request';

import { TrackHeaderComponent } from './components/track-header/track-header.component';
import { TrackSearchFilterComponent } from './components/track-search-filter/track-search-filter.component';
import { TrackListComponent } from './components/track-list/track-list.component';
import { TrackEmptyStateComponent } from './components/track-empty-state/track-empty-state.component';
import { TrackPaginationComponent } from './components/track-pagination/track-pagination.component';
import { TrackEditModalComponent } from './components/track-edit-modal/track-edit-modal.component';
import { TrackAddModalComponent } from './components/track-add-modal/track-add-modal.component';
import { TrackDeleteModalComponent } from './components/track-delete-modal/track-delete-modal.component';
import { TrackCantEditModalComponent } from './components/track-cant-edit-modal/track-cant-edit-modal.component';
import { TrackCantDeleteModalComponent } from './components/track-cant-delete-modal/track-cant-delete-modal.component';
import { TrackToastsComponent } from './components/track-toasts/track-toasts.component';

@Component({
  selector: 'app-training-track',
  imports: [
    CommonModule,
    SideBarComponent,
    ReactiveFormsModule,
    FormsModule,
    TrackHeaderComponent,
    TrackSearchFilterComponent,
    TrackListComponent,
    TrackEmptyStateComponent,
    TrackPaginationComponent,
    TrackEditModalComponent,
    TrackAddModalComponent,
    TrackDeleteModalComponent,
    TrackCantEditModalComponent,
    TrackCantDeleteModalComponent,
    TrackToastsComponent,
  ],
  templateUrl: './training-track.component.html',
  styleUrl: './training-track.component.scss',
})
export class TrainingTrackComponent implements OnInit {
  courses: Course[] = COURSES;
  trainingTracks: ProgramPath[] = [];
  filteredTrainingTracks: ProgramPath[] = [];
  loading = true;
  error = '';
  success = '';
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 1;
  statusId = 0; // Default to show all statuses
  lang = 'ar'; // Default language

  showEditModal = false;
  editTrackForm: FormGroup;
  editingTrack: ProgramPath | null = null;
  processingForm = false;
  formError = '';
  formSuccess = '';

  showAddModal = false;
  addTrackForm: FormGroup;
  processingAddForm = false;
  addFormError = '';
  addFormSuccess = '';

  showDeleteModal = false;
  trackToDelete: ProgramPath | null = null;
  processingDelete = false;
  deleteError = '';
  deleteSuccess = '';

  showCantEditModal = false;
  showCantDeleteModal = false;

  showSuccessToast = false;
  showErrorToast = false;
  successToastMessage = '';
  errorToastMessage = '';
  toastTimeout: any = null;

  searchQuery = '';
  sortOrder: 'asc' | 'desc' | 'none' = 'none';

  allTrainingTracks: ProgramPath[] = [];

  constructor(
    private trackService: TrainingTrackService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.editTrackForm = this.fb.group({
      titleAr: ['', Validators.required],
      titleEn: ['', Validators.required],
      isArabic: [false],
      isEnglish: [false],
      statusId: [1],
    });

    this.addTrackForm = this.fb.group({
      titleAr: ['', Validators.required],
      titleEn: ['', Validators.required],
      isArabic: [false],
      isEnglish: [false],
      statusId: [1],
    });
  }

  ngOnInit() {
    this.loadTracks();
  }

  showSuccessAlert(message: string) {
    this.successToastMessage = message;
    this.showSuccessToast = true;
    this.showErrorToast = false;

    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }

    this.toastTimeout = setTimeout(() => {
      this.hideToasts();
    }, 3000);
  }

  showErrorAlert(message: string) {
    this.errorToastMessage = message;
    this.showErrorToast = true;
    this.showSuccessToast = false;

    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }

    this.toastTimeout = setTimeout(() => {
      this.hideToasts();
    }, 3000);
  }

  hideToasts() {
    this.showSuccessToast = false;
    this.showErrorToast = false;
  }

  loadTracks() {
    this.loading = true;

    this.trackService
      .getAllTracksWithFilter(this.currentPage, this.pageSize, 0, 'ar', '', [])
      .subscribe({
        next: (response: ProgramPathsResponse) => {
          if (response.code === 200) {
            this.allTrainingTracks = response.data.result;
            this.totalItems = response.data.totalCount;
            this.calculateTotalPages();
            this.success = 'Training tracks loaded successfully';

            this.applyLocalFilters();
          } else {
            this.error = 'Failed to load training tracks';
          }
          this.loading = false;
        },
        error: (err: any) => {
          this.error = 'Error loading training tracks';
          this.loading = false;
          console.error('Error loading tracks:', err);
        },
      });
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    if (this.totalPages === 0) {
      this.totalPages = 1;
    }
  }

  applyLocalFilters() {
    let filtered = [...this.allTrainingTracks];

    if (this.statusId > 0) {
      const statusName=this.statusId===1? 'مفعل' : 'غير مفعل';
      filtered = filtered.filter((track) => track.statusName === statusName);
      // filtered = filtered.filter((track) => track.statusId === this.statusId);

    }

    if (this.lang) {
      filtered = filtered.filter((track) => {
        if (this.lang === 'ar') return track.isArabic;
        if (this.lang === 'en') return track.isEnglish;
        return true;
      });
    }

    if (this.searchQuery && this.searchQuery.trim() !== '') {
      const query = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (track) =>
          (track.titleAr && track.titleAr.toLowerCase().includes(query)) ||
          (track.titleEn && track.titleEn.toLowerCase().includes(query)) ||
          (track.statusName &&
            track.statusName.toLowerCase().includes(query)) ||
          false
      );
    }

    if (this.sortOrder === 'asc') {
      filtered.sort(
        (a, b) =>
          a.trainingProgramsCount +
          a.generalProgramsCount -
          (b.trainingProgramsCount + b.generalProgramsCount)
      );
    } else if (this.sortOrder === 'desc') {
      filtered.sort(
        (a, b) =>
          b.trainingProgramsCount +
          b.generalProgramsCount -
          (a.trainingProgramsCount + a.generalProgramsCount)
      );
    }

    this.totalItems = filtered.length;
    this.calculateTotalPages();

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, filtered.length);

    this.filteredTrainingTracks = filtered.slice(startIndex, endIndex);
    this.trainingTracks = this.filteredTrainingTracks;
  }

  onPageChange(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.applyLocalFilters();
  }

  filterByStatus(statusId: number) {
    this.statusId = statusId;
    this.currentPage = 1;
    this.applyLocalFilters();
  }

  setLanguage(lang: string) {
    this.lang = lang;
    this.applyLocalFilters();
  }

  searchTracks(query: string) {
    console.log('تم البحث عن:', query);
    this.searchQuery = query;
    this.currentPage = 1;
    this.applyLocalFilters();
  }

  onAddTrack() {
    this.addTrackForm.reset({
      titleAr: '',
      titleEn: '',
      isArabic: false,
      isEnglish: false,
      statusId: 1,
    });
    this.addFormError = '';
    this.addFormSuccess = '';
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  createTrack() {
    if (this.addTrackForm.valid) {
      this.processingAddForm = true;
      this.addFormError = '';

      const trackData: TrackCreateRequest = {
        id: 0, // Always 0 for new tracks
        titleAr: this.addTrackForm.value.titleAr,
        titleEn: this.addTrackForm.value.titleEn,
        isArabic: this.addTrackForm.value.isArabic,
        isEnglish: this.addTrackForm.value.isEnglish,
        statusId: this.addTrackForm.value.statusId,
      };

      if (!trackData.isArabic && !trackData.isEnglish) {
        this.addFormError = 'يجب اختيار لغة واحدة على الأقل';
        this.processingAddForm = false;
        return;
      }

      this.trackService.createTrack(trackData, this.lang).subscribe({
        next: (response) => {
          console.log('Create response:', response);
          if (response && response.code === 200) {
            this.closeAddModal();
            this.showSuccessAlert('تم إنشاء المسار بنجاح');
            this.loadTracks();
          } else {
            this.showErrorAlert('فشل إنشاء المسار');
          }
          this.processingAddForm = false;
        },
        error: (err) => {
          console.error('Error creating track:', err);
          this.showErrorAlert('حدث خطأ أثناء إنشاء المسار');
          this.processingAddForm = false;
        },
      });
    }
  }

  openEditModal(track: ProgramPath) {
    // if (track.trainingProgramsCount > 0 || track.generalProgramsCount > 0) {
    //   this.showCantEditModal = true;
    //   return;
    // }

    this.editingTrack = track;
    this.formError = '';
    this.formSuccess = '';

    this.editTrackForm.patchValue({
      titleAr: track.titleAr,
      titleEn: track.titleEn,
      isArabic: track.isArabic,
      isEnglish: track.isEnglish,
      statusId: track.statusId || 1,
    });

    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editingTrack = null;
  }

  saveTrack() {
    if (this.editTrackForm.valid && this.editingTrack) {
      this.processingForm = true;
      this.formError = '';

      const trackData: TrackCreateRequest = {
        id: this.editingTrack.id,
        titleAr: this.editTrackForm.value.titleAr,
        titleEn: this.editTrackForm.value.titleEn,
        isArabic: this.editTrackForm.value.isArabic,
        isEnglish: this.editTrackForm.value.isEnglish,
        statusId: this.editTrackForm.value.statusId,
      };

      this.trackService.updateTrack(trackData, this.lang).subscribe({
        next: (response) => {
          console.log('Update response:', response);
          if (response && response.code === 200) {
            this.closeEditModal();
            this.showSuccessAlert('تم تعديل المسار بنجاح');
            this.loadTracks();
          } else {
            this.showErrorAlert('فشل تعديل المسار');
          }
          this.processingForm = false;
        },
        error: (err) => {
          console.error('Error updating track:', err);
          this.showErrorAlert('حدث خطأ أثناء تعديل المسار');
          this.processingForm = false;
        },
      });
    }
  }

  openDeleteModal(track: ProgramPath) {
    // if (track.trainingProgramsCount > 0 || track.generalProgramsCount > 0) {
    //   this.showCantDeleteModal = true;
    //   return;
    // }

    this.trackToDelete = track;
    this.deleteError = '';
    this.deleteSuccess = '';
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.trackToDelete = null;
  }

  confirmDelete() {
    if (!this.trackToDelete) return;

    this.processingDelete = true;
    this.deleteError = '';

    this.trackService.deleteTrack(this.trackToDelete.id, this.lang).subscribe({
      next: (response) => {
        console.log('Delete response:', response);
        if (response && response.code === 200) {
          this.closeDeleteModal();
          this.showSuccessAlert('تم حذف المسار بنجاح');
          this.loadTracks();
        } else {
          this.showErrorAlert('فشل حذف المسار');
        }
        this.processingDelete = false;
      },
      error: (err) => {
        console.error('Error deleting track:', err);
        if (
          err.status === 400 &&
          err.error &&
          err.error.message.includes('associated')
        ) {
          this.closeDeleteModal();
          this.showCantDeleteModal = true;
        } else {
          this.showErrorAlert('حدث خطأ أثناء حذف المسار');
        }
        this.processingDelete = false;
      },
    });
  }

  closeCantEditModal() {
    this.showCantEditModal = false;
  }

  closeCantDeleteModal() {
    this.showCantDeleteModal = false;
  }

  onEditTrack(id: number) {
    const track = this.trainingTracks.find((t) => t.id === id);
    if (track) {
      this.openEditModal(track);
    } else {
      this.router.navigate(['/training-paths/edit', id]);
    }
  }

  onDeleteTrack(id: number) {
    const track = this.trainingTracks.find((t) => t.id === id);
    if (track) {
      this.openDeleteModal(track);
    }
  }

  onViewDetails(id: number) {
    this.router.navigate(['/training-paths', id]);
  }

  updateAddStatus(event: any) {
    const isActive = event.target.checked;
    this.addTrackForm.patchValue({
      statusId: isActive ? 1 : 2,
    });
  }

  updateEditStatus(event: any) {
    const isActive = event.target.checked;
    this.editTrackForm.patchValue({
      statusId: isActive ? 1 : 2,
    });
  }

  onStatusChange(data: { id: number; statusId: number }) {
    this.trackService
      .updateTrackStatus(data.id, data.statusId, this.lang)
      .subscribe({
        next: (response) => {
          console.log('Status update response:', response);

          const trackIndex = this.trainingTracks.findIndex(
            (track) => track.id === data.id
          );
          if (trackIndex !== -1) {
            this.trainingTracks[trackIndex].statusId = data.statusId;
            this.trainingTracks[trackIndex].statusName =
              data.statusId === 1 ? 'مفعل' : 'غير مفعل';

            this.showSuccessAlert('تم تغيير حالة المسار التدريبي بنجاح');

            this.loadTracks();
          }
        },
        error: (error) => {
          console.error('Error updating track status:', error);
          this.showErrorAlert('حدث خطأ أثناء تغيير حالة المسار التدريبي');
        },
      });
  }

  handleFilters(filters: any) {
    this.statusId = filters.status;
    this.lang = filters.language;
    this.sortOrder = filters.sortOrder;
    this.searchQuery = filters.searchText;
    this.currentPage = 1;
    this.applyLocalFilters();
  }
}
