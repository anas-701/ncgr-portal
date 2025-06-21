import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SideBarComponent } from '../../side-bar/side-bar.component';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AppLookUpServiceService } from '../../../@core/services/app-look-up-service.service';
import { AppLookUpResponse } from '../../../@models/app-lookup-response.model';
import { TrackPaginationComponent } from '../../training-track/components/track-pagination/track-pagination.component';
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { ApproverDashboardComponent } from './approver-dashboard/approver-dashboard.component';
import { CreatorDashboardComponent } from "./creator-dashboard/creator-dashboard.component";
import { TraineeDashboardComponent } from "./trainee-dashboard/trainee-dashboard.component";
import { TraineeFilterComponent } from "../helpers/trainee-filter/trainee-filter.component";
import { AdminFilterComponent } from "../helpers/admin-filter/admin-filter.component";
import { GeneralProgramsService } from '../service/general-programs.service';
import { ToasterService } from '../../../@shared/toaster.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SideBarComponent,
    ReactiveFormsModule,
    TrackPaginationComponent,
    AdminDashboardComponent,
    ApproverDashboardComponent,
    CreatorDashboardComponent,
    TraineeDashboardComponent,
    TraineeFilterComponent,
    AdminFilterComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class GeneralProgramsDashboardComponent implements OnInit {
  statusOptions: AppLookUpResponse[] = [];
  languages: AppLookUpResponse[] = [];
  category: AppLookUpResponse[] = [];
  paths: AppLookUpResponse[] = [];
  tags: AppLookUpResponse[] = [];
  selectedStatus: string = '';
  totalItems = 0;
  isLoading = false;
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 6;
  showRate=false;
   role: string | null = null;
  searchForm!: FormGroup;
  programs=[
  {
    "Id": "1f42a1e8-5c21-4e9b-8aab-57fa245f8991",
    "TitleAr": "برنامج تطوير القادة",
    "Target": "المدراء الجدد",
    "StartDate": "2025-07-01T09:00:00Z",
    "EndDate": "2025-07-05T17:00:00Z",
    "TrainingProgramsNumber": 3,
    "WorkShopsNumber": 2,
    "CertificateType": "شهادة مشاركة",
    "Path": "المسار الإداري",
    "SeatsNumber": 30,
    "Language": "العربية",
    "Type": "حضوري",
    "ModifiedDate": "2025-06-11T10:30:00Z"
  },
  {
    "Id": "2e13a4b7-d9f2-4dd4-a0ab-2e9b718abe7c",
    "TitleAr": "إدارة المشاريع المتقدمة",
    "Target": "مدراء المشاريع",
    "StartDate": "2025-08-10T08:00:00Z",
    "EndDate": "2025-08-20T15:00:00Z",
    "TrainingProgramsNumber": 6,
    "WorkShopsNumber": 4,
    "CertificateType": "شهادة معتمدة",
    "Path": "المسار التنفيذي",
    "SeatsNumber": 30,
    "Language": "العربية",
    "Type": "عن بعد",
    "ModifiedDate": "2025-06-09T14:45:00Z"
  },
  {
    "Id": "72e0592d-a412-4893-a939-bb064f40dd7e",
    "TitleAr": "الكفاءة الرقمية في القطاع الحكومي",
    "Target": "جميع الموظفين",
    "StartDate": "2025-09-01T09:00:00Z",
    "EndDate": "2025-09-10T17:00:00Z",
    "TrainingProgramsNumber": 4,
    "WorkShopsNumber": 1,
    "CertificateType": "شهادة إلكترونية",
    "Path": "المسار الرقمي",
    "SeatsNumber": 30,
    "Language": "الانجليزية",
    "Type": "حضوري",
    "ModifiedDate": "2025-06-11T09:20:00Z"
  }
]
  allPrograms: any;


  constructor(
    private fb: FormBuilder,
    private appLookUpService: AppLookUpServiceService,
    private router: Router,
    private generalProgramsService: GeneralProgramsService,
    private toaster: ToasterService
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
      progress: [0],
    });
  }

  ngOnInit() {
    this.role = localStorage.getItem('role')||'admin';
    this.loadFilterOptions();
    this.searchForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.currentPage = 1;
 
      });
  }
  onAddProgram() {
    this.router.navigate(['/add-general-program']);
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
 buildRequestParams(): any {
    const formValue = this.searchForm.value;

    const orderByValue: any[] = [];

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

    this.generalProgramsService.getAllGeneralPrograms(request).subscribe({
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
    
      this.generalProgramsService
        .deleteGeneralProgram(programId.toString())
        .subscribe({
          next: () => {
            // Reload programs after deletion
            this.loadPrograms();
            this.toaster.success('تم حذف البرنامج بنجاح');
          },
          error: (error: any) => {
            this.toaster.error( 'حدث خطأ أثناء حذف البرنامج');
          },
        });
  }
 onStatusChange(event: { id: number; statusId: number }): void {
    // Update program status
    console.log('Change status:', event);

    // Use the dedicated method for updating program status
    this.generalProgramsService
      .updateGeneralProgramStatus(event.id.toString(), event.statusId)
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
  onTraineesView(programId: number): void {
    // Navigate to trainees page
    console.log('View trainees:', programId);
    this.router.navigate(['/generalPrograms/trainees', programId, 'trainees']);
  }

  createNewProgram(): void {
    // التنقل إلى صفحة إنشاء برنامج تدريبي جديد
    this.router.navigate(['/dashboard/program/create']);
  }

 
}
