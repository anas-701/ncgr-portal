import { Component, OnInit, ViewChild, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { CourseAccordionComponent } from './component/course-accordion/course-accordion.component';
import { Section } from './models/section.model';
import { SectionsService } from './services/training-content-service';
import { ActivatedRoute } from '@angular/router';
import { ContentHeaderComponent } from './component/content-header/content-header.component';
import { ToasterService } from '../../@shared/toaster.service';

@Component({
  selector: 'app-training-content',
  standalone: true,
  imports: [
    CommonModule,
    SideBarComponent,
    ReactiveFormsModule,
    CourseAccordionComponent,
    ContentHeaderComponent,
  ],
  templateUrl: './training-content.component.html',
  styleUrl: './training-content.component.scss',
})
export class TrainingContentComponent implements OnInit {
  @ViewChild('courseAccordion') courseAccordion!: CourseAccordionComponent;

  sectionForm!: FormGroup;
  sections = signal<Section[]>([]);
  programTitle: string = '';
  programId: number = 0;
  constructor(
    private fb: FormBuilder,
    private sectionService: SectionsService,
    private toaster: ToasterService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.programId = +params['id'];
      this.programTitle = params['title'];
    });

    this.sectionForm = this.fb.group({
      arabicTitle: ['', [Validators.required,Validators.pattern(/^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF ]+$/)
]],
      englishTitle: ['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9\s\-_.,:;!?@#$%^&*()]+$/)
]],
    });
  }

  onSubmit(): void {
    // Check if the form is valid before proceeding
    if (this.sectionForm.invalid) {
      this.toaster.error('الرجاء ملء جميع الحقول بشكل صحيح');
      return;
    }
    if (this.sectionForm.valid) {
      const sectionRequest = {
        trainingProgramId: this.programId,
        nameAr: this.sectionForm.value.arabicTitle,
        nameEn: this.sectionForm.value.englishTitle,
      };

      this.sectionService.addSection(sectionRequest).subscribe({
        next: () => {
          this.toaster.success('تمت إضافة القسم بنجاح');
          this.sectionForm.reset();
          document.getElementById('closeModalBtn')?.click();

          this.courseAccordion.getSectionsByProgramId(this.programId);
        },
        error: (error) => {
          this.toaster.error('حدث خطأ ما ولم يتم إضافة القسم');
          console.error('Error submitting form:', error);
        },
        complete: () => {
          console.log('Form submission completed');
        },
      });
    }
  }
}
