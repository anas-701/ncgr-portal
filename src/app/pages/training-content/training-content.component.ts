import { Component, OnInit, ViewChild, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { CourseAccordionComponent } from './component/course-accordion/course-accordion.component';
import { Section } from './models/section.model';
import { SectionsService } from './services/training-content-service';
import { ActivatedRoute } from '@angular/router';
import { ContentHeaderComponent } from './component/content-header/content-header.component';

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
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.programId = +params['id'];
      this.programTitle = params['title'];
    });

    this.sectionForm = this.fb.group({
      arabicTitle: ['', Validators.required],
      englishTitle: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.sectionForm.valid) {
      const sectionRequest = {
        trainingProgramId: this.programId,
        nameAr: this.sectionForm.value.arabicTitle,
        nameEn: this.sectionForm.value.englishTitle,
      };

      this.sectionService.addSection(sectionRequest).subscribe({
        next: () => {
          this.toastr.success('تمت إضافة القسم بنجاح');
          this.sectionForm.reset();
          document.getElementById('closeModalBtn')?.click();

          this.courseAccordion.getSectionsByProgramId(this.programId);
        },
        error: (error) => {
          this.toastr.error('حدث خطأ ما ولم يتم إضافة القسم');
          console.error('Error submitting form:', error);
        },
        complete: () => {
          console.log('Form submission completed');
        },
      });
    }
  }
}
