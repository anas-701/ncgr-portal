import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SharedCardComponent } from '../../../../../../@shared/shared-card/shared-card.component';
import { ProgramCardComponent } from '../../../../../../@shared/program-card/program-card.component';
import { SideBarComponent } from '../../../../../../pages/side-bar/side-bar.component';
import { TrainingProgramsService } from '../../../../../../@core/services/training-programs.service';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
import {
  GetAllProgramsRequest,
  OrderByValue,
  GetAllProgramsResponse,
} from '../../../../../../@models/training-program.model';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AppLookUpServiceService } from '../../../../../../@core/services/app-look-up-service.service';
import { AppLookUpResponse } from '../../../../../../@models/app-lookup-response.model';
import { ProgramHeaderComponent } from './components/program-header/program-header.component';
import { ProgramSearshFilterComponent } from './components/program-searsh-filter/program-searsh-filter.component';
import { TrackPaginationComponent } from '../../../../../../pages/training-track/components/track-pagination/track-pagination.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    // SharedCardComponent,
    ProgramCardComponent,
    SideBarComponent,
    // MatPaginator,
    ReactiveFormsModule,
    ProgramHeaderComponent,
    ProgramSearshFilterComponent,
    TrackPaginationComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  statusOptions: AppLookUpResponse[] = [];
  languages: AppLookUpResponse[] = [];
  category: AppLookUpResponse[] = [];
  paths: AppLookUpResponse[] = [];
  tags: AppLookUpResponse[] = [];
  selectedStatus: string = '';
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;
  programs: GetAllProgramsResponse[] = [];
  allPrograms: GetAllProgramsResponse[] = [];
  totalItems = 0;
  isLoading = false;
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 6;

  requestParams: GetAllProgramsRequest = {
    pageNumber: 1,
    pageSize: 6,
    filter: {
      statusId: 0,
      isActive: false,
      isNotActive: false,
      isArabic: false,
      isEnglish: false,
      languageId: 0,
      categoryId: 0,
      pathId: 0,
      tageId: 0,
      countTrainer: 0,
      evaluationId: 0,
    },
    orderByValue: [],
  };

  searchForm!: FormGroup;

  constructor(
    private programService: TrainingProgramsService,
    private fb: FormBuilder,
    private appLookUpService: AppLookUpServiceService,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      programName: [''],
      status: this.fb.group({
      isActive: [false],
      isNotActive: [false]
    }),
    language: this.fb.group({
      arabic: [false],
      english: [false]
    }),
      categoryId: [0],
      pathId: [0],
      tageId: [0],
      countTrainer: [0],
      evaluationId: [0],
    });
  }

  ngOnInit() {
    this.loadPrograms();
    this.loadFilterOptions();
    this.searchForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.currentPage = 1;
        this.loadPrograms();
      });
  }
  onAddProgram() {
    this.router.navigate(['/add-training-program']);
  }
  loadFilterOptions() {
    this.appLookUpService.getAllProgramStatus().subscribe({
      next: (response) => {
        this.statusOptions = response.result || [];
        console.log(this.statusOptions);
      },
    });

    this.appLookUpService.getAllLanguages().subscribe({
      next: (response) => {
        this.languages = response.result || [];
      },
    });

    this.appLookUpService.getAllCategories().subscribe({
      next: (response) => {
        this.category = response.result || [];
      },
    });

    this.appLookUpService.getAllPaths().subscribe({
      next: (response) => {
        this.paths = response.result || [];
      },
    });

    this.appLookUpService.getAllTags().subscribe({
      next: (response) => {
        this.tags = response.result || [];
      },
    });
  }

  buildRequestParams(): GetAllProgramsRequest {
    const formValue = this.searchForm.value;

    const orderByValue: OrderByValue[] = [];

    if (formValue.countTrainer > 0) {
      orderByValue.push({
        colId: 'participants',
        sort: formValue.countTrainer === 1 ? 1 : 2,
      });
    }

    if (formValue.evaluationId > 0) {
      orderByValue.push({
        colId: 'rate',
        sort: formValue.evaluationId === 1 ? 1 : 2,
      });
    }

    return {
      pageNumber: this.currentPage,
      pageSize: this.itemsPerPage,
      filter: {
        programName: formValue.programName || undefined,
        statusId: formValue.statusId,
        languageId: formValue.languageId,
        isActive: formValue.status.isActive,
        isNotActive: formValue.status.isNotActive,
        isArabic: formValue.language.arabic,
        isEnglish: formValue.language.english,
        categoryId: formValue.categoryId,
        pathId: formValue.pathId,
        tageId: formValue.tageId,
        countTrainer: formValue.countTrainer,
        evaluationId: formValue.evaluationId,
      },
      orderByValue: orderByValue.length > 0 ? orderByValue : undefined,
    };
  }

  loadPrograms(): void {
    this.isLoading = true;

    const request = this.buildRequestParams();

    this.programService.getAllTrainingPrograms(request).subscribe({
      next: (response) => {
        if (response?.data?.result) {
          this.allPrograms = response.data.result;
          this.totalItems = response.data.totalCount || this.allPrograms.length;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

          this.applyPagination();
        } else {
          this.programs = [];
          this.totalItems = 0;
          this.totalPages = 1;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading programs:', error);
        this.isLoading = false;
        this.programs = [];
        this.totalItems = 0;
        this.totalPages = 1;
      },
    });
  }

  applyPagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(
      startIndex + this.itemsPerPage,
      this.allPrograms.length
    );
    this.programs = this.allPrograms.slice(startIndex, endIndex);
  }

  resetFilters(): void {
    this.searchForm.reset({
      programName: '',
      status: {
      isActive: false,
      isNotActive: false
    },
    language: {
      arabic: false,
      english: false
    },
      categoryId: 0,
      pathId: 0,
      tageId: 0,
      countTrainer: 0,
      evaluationId: 0,
    });

    this.currentPage = 1;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    if (this.allPrograms.length > this.itemsPerPage) {
      this.applyPagination();
    } else {
      this.loadPrograms();
    }
  }

  editProgram(id: number) {
    console.log('Navigate to dashboard with id:', id);
    this.router.navigate(['/dashboard', id]).then((success) => {
      console.log('Navigation success?', success);
    });
  }

  onProgramView(programId: number): void {
    // Handle view program details
    console.log('View program details:', programId);
    this.router.navigate(['/dashboard/program', programId, 'view']);
  }

  onProgramEdit(programId: number): void {
    // Navigate to edit program page
    console.log('Edit program:', programId);
    this.router.navigate(['/dashboard/program', programId, 'edit']);
  }

  onProgramDelete(programId: number): void {
    // Handle program deletion
    console.log('Delete program:', programId);
    if (confirm('هل أنت متأكد من حذف هذا البرنامج؟')) {
      this.programService
        .deleteTrainingProgram(programId.toString())
        .subscribe({
          next: () => {
            // Reload programs after deletion
            this.loadPrograms();
            alert('تم حذف البرنامج بنجاح');
          },
          error: (error: any) => {
            console.error('Error deleting program:', error);
          },
        });
    }
  }

  // onTrainingContent(programId: number): void {
  //   // Navigate to training content page
  //   console.log('View training content:', programId);
  //   this.router.navigate(['', programId, 'content']);
  // }

  onTraineesView(programId: number): void {
    // Navigate to trainees page
    console.log('View trainees:', programId);
    this.router.navigate(['/dashboard/program', programId, 'trainees']);
  }

  createNewProgram(): void {
    // التنقل إلى صفحة إنشاء برنامج تدريبي جديد
    this.router.navigate(['/dashboard/program/create']);
  }

  onStatusChange(event: { id: number; statusId: number }): void {
    // Update program status
    console.log('Change status:', event);

    // Use the dedicated method for updating program status
    this.programService
      .updateTrainingProgramStatus(event.id.toString(), event.statusId)
      .subscribe({
        next: () => {
          // Reload programs after status update
          this.loadPrograms();
        },
        error: (error: any) => {
          console.error('Error updating program status:', error);
        },
      });
  }
}
