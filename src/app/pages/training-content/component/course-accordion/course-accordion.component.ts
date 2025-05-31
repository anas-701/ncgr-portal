import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lecture, Question, Section } from '../../models/section.model';
import { DeleteSectionModalComponent } from './component/delete-section-modal/delete-section-modal.component';
import { AddLectureModalComponent } from './component/add-lecture-modal/add-lecture-modal.component';
import { EditSectionModalComponent } from './component/edit-section-modal/edit-section-modal.component';
import { DeleteLectureModalComponent } from './component/delete-lecture-modal/delete-lecture-modal.component';
import { EditLectureModalComponent } from './component/edit-lecture-modal/edit-lecture-modal.component';
import { AddTextModalComponent } from './component/add-text-modal/add-text-modal.component';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TestInfoModalComponent } from './component/test-info-modal/test-info-modal.component';
import { AddTfModalComponent } from './component/add-tf-modal/add-tf-modal.component';
import { AddMcqModalComponent } from './component/add-mcq-modal/add-mcq-modal.component';
import { SectionsService } from '../../services/training-content-service';

@Component({
  selector: 'app-course-accordion',
  imports: [
    CommonModule,
    DeleteSectionModalComponent,
    AddLectureModalComponent,
    EditSectionModalComponent,
    DeleteLectureModalComponent,
    EditLectureModalComponent,
    AddTextModalComponent,
    DragDropModule,
    TestInfoModalComponent,
    AddTfModalComponent,
    AddMcqModalComponent,
  ],
  templateUrl: './course-accordion.component.html',
  styleUrl: './course-accordion.component.scss',
})
export class CourseAccordionComponent {
  @Input() programId: number = 0;
  @Input() save = new EventEmitter<Section>();
  sections: Section[] = [];
  activeSectionId: number | null = null;
  lectureSectionId: any;
  showEditModal = false;
  showDeleteModal = false;
  showAddLectureModal = false;
  showAddTextModal = false;
  showEditLectureModal = false;
  showDeleteLectureModal = false;
  showAddMcqModal = false;
  showAddTfModal = false;
  showTestInfoModal = false;
  loading = true;
  selectedSection?: Section;
  selectedLecture: Lecture | null = null;
  selectedTest: Lecture | null = null;
  selectedLectureType?: any;
  selectedQuestion: Question | null = null;
  constructor(private sectionService: SectionsService) {}

  ngOnInit(): void {
    this.getSectionsByProgramId(this.programId);
  }

  getSectionsByProgramId(programId: number) {
    const requestBody = {
      pageNumber: 1,
      pageSize: 10,
      filter: {
        trainingProgramId: programId,
      },
    };
    this.loading = true;
    this.sectionService.getSections(requestBody).subscribe({
      next: (response) => {
        this.sections = response.data.result;
        this.loading = false;
        console.log('Fetched Sections:', this.sections);
      },
      error: (error) => {
        this.loading = false;
        console.error('Error fetching sections:', error);
      },
    });
  }
  toggleSection(sectionId: number): void {
    this.activeSectionId =
      this.activeSectionId === sectionId ? null : sectionId;
  }

  getLectureIcon(type: number): string {
    switch (type) {
      case 1:
        return 'acc_icon_41.svg';
      case 2:
        return 'acc_icon_40.svg';
      case 3:
        return 'acc_icon_42.svg';
      case 4:
        return 'acc_icon_43.svg';
      case 5:
        return 'acc_icon_44.svg';
      case 6:
        return 'acc_icon_45.svg';
      default:
        return '';
    }
  }

  getLectureTypeName(type?: number): string {
    switch (type) {
      case 1:
        return 'نص';
      case 2:
        return 'فيديو';
      case 3:
        return 'وثيقة';
      case 4:
        return 'صوت';
      case 5:
        return 'صورة';
      case 6:
        return 'اختبار';
      default:
        return 'محاضرة';
    }
  }

  getTestTotalScore(lecture: Lecture): number {
    return (
      lecture.exameQuestions?.reduce((sum, q) => sum + q.questionDegree, 0) || 0
    );
  }

  dropLecture(event: CdkDragDrop<Lecture[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  openEditModal(section: Section): void {
    this.selectedSection = { ...section };
    this.showEditModal = true;
  }

  onSaveSection(updatedSection: Section): void {
    const index = this.sections.findIndex((s) => s.id === updatedSection.id);
    if (index !== -1) {
      this.sections[index] = updatedSection;
    }
    this.showEditModal = false;
  }

  openDeleteModal(section: Section): void {
    this.selectedSection = section;
    this.showDeleteModal = true;
  }

  onConfirmDelete(): void {
    if (this.selectedSection) {
      this.sections = this.sections.filter(
        (s) => s.id !== this.selectedSection!.id
      );
    }
    this.showDeleteModal = false;
  }

  openAddLectureModal(section: Section, type: string): void {
    this.selectedSection = section;
    this.selectedLectureType = type;
    this.showAddLectureModal = true;
  }

  onAddLecture(newLecture: Lecture): void {
    if (this.selectedSection) {
      newLecture.id =
        Math.max(...this.selectedSection.lectures.map((l) => l.id), 0) + 1;
      this.selectedSection.lectures.push(newLecture);
      this.showAddLectureModal = false;
    }
  }
  onLectureSave(lectureData: any) {
    this.loading = true;
    this.sectionService.createLecture(lectureData).subscribe({
      next: (response) => {
        alert('تمت إضافة المحاضرة بنجاح');
        this.loading = false;
        this.getSectionsByProgramId(this.programId);
      },
      error: (error) => {
        alert('حدث خطأ أثناء إضافة المحاضرة');
        this.loading = false;

        console.error('Error adding lecture:', error);
      },
    });
  }
  openAddTextModal(lecture: Lecture): void {
    this.selectedLecture = lecture;
    this.showAddTextModal = true;
  }

  onSaveLectureText(newText: string): void {
    if (this.selectedLecture) {
      this.selectedLecture.contentDetails = newText;
      this.showAddTextModal = false;
    }
    this.onEditLecture(this.selectedLecture!);
  }

  openEditLectureModal(lecture: Lecture, lectureSectionId: any): void {
    this.selectedLecture = { ...lecture };
    this.lectureSectionId = lectureSectionId;
    this.showEditLectureModal = true;
  }

  onEditLecture(updatedLecture: any): void {
    this.loading = true;
    this.sectionService.updateLecture(updatedLecture).subscribe({
      next: (response) => {
        const sectionIndex = this.sections.findIndex((s) =>
          s.lectures.some((l) => l.id === updatedLecture.id)
        );

        if (sectionIndex !== -1) {
          const lectureIndex = this.sections[sectionIndex].lectures.findIndex(
            (l) => l.id === updatedLecture.id
          );

          if (lectureIndex !== -1) {
            this.sections[sectionIndex].lectures[lectureIndex] = updatedLecture;
          }

          alert('تمت تعديل المحاضرة بنجاح');
          this.loading = false;
        }
        this.getSectionsByProgramId(this.programId);
      },
      error: (error) => {
        alert('حدث خطأ أثناء تعديل المحاضرة');
        this.loading = false;

        console.error('Error adding lecture:', error);
      },
    });
  }

  openDeleteLectureModal(lecture: Lecture): void {
    this.selectedLecture = lecture;
    this.showDeleteLectureModal = true;
  }

  onDeleteLecture(): void {
    this.loading = true;
    this.sectionService.deleteLecture(this.selectedLecture!.id).subscribe({
      next: (response) => {
        alert('تم حذف المحاضرة بنجاح');
        this.loading = false;
        this.getSectionsByProgramId(this.programId);
      },
      complete: () => {
        console.log('Form submission completed');
      },
      error: (error) => {
        alert('حدث خطأ ما ولم يتم حذف المحاضرة');
        this.loading = false;

        console.error('Error submitting form:', error);
      },
    });
  }

  openAddMcqModal(lecture: Lecture): void {
    this.selectedTest = lecture;
    this.showAddMcqModal = true;
  }

  openAddTfModal(lecture: Lecture): void {
    this.selectedTest = lecture;
    this.showAddTfModal = true;
  }

  openTestInfoModal(lecture: Lecture): void {
    this.selectedTest = lecture;
    this.showTestInfoModal = true;
  }

  onAddQuestion(question: Question): void {
    question.trainingProgramContentDetailsId = this.selectedTest?.id || 0;
    if (this.selectedTest) {
      if (!this.selectedTest.exameQuestions) {
        this.selectedTest.exameQuestions = [];
      }

      const exameTotal = this.selectedTest.exameQuestions.reduce(
        (sum, q) => sum + q.questionDegree,
        0
      );
      if (exameTotal + question.questionDegree > this.selectedTest.exameTotal) {
        alert(
          'نتيجه الاختبار يجب ان تكون اقل من او تساوي  ' +
            this.selectedTest.exameTotal
        );
        return;
      }
      if (!question.choiceCorrect) {
        alert('يجب اختيار اجابة قبل الحفظ ');
        return;
      }
      this.loading = true;
      this.sectionService.addQuestion(question).subscribe({
        next: (response) => {
          alert('تم اضافة السؤال بنجاح');
          this.loading = false;
        },
        complete: () => {
          console.log('Form submission completed');
        },
        error: (error) => {
          alert('حدث خطأ ما ولم يتم اضافة السؤال');
          this.loading = false;
          console.error('Error submitting form:', error);
        },
      });

      this.selectedTest.exameQuestions.push(question);
    }
    this.showAddMcqModal = false;
    this.showAddTfModal = false;
  }
  openEditQuestion(question: Question): void {
    if (question) {
      this.selectedQuestion = question;
      if (+question.questionTypeId === 1) {
        this.openAddMcqModal(this.selectedTest!);
      } else if (+question.questionTypeId === 2) {
        this.openAddTfModal(this.selectedTest!);
      }
    }
  }
  onEditQuestion(question: Question): void {
    if (this.selectedTest) {
      if (!this.selectedTest.exameQuestions) {
        this.selectedTest.exameQuestions = [];
      }
      this.selectedTest.exameQuestions =
        this.selectedTest.exameQuestions.filter((q) => q.id !== question.id);
      const exameTotal = this.selectedTest.exameQuestions.reduce(
        (sum, q) => sum + q.questionDegree,
        0
      );
      if (exameTotal + question.questionDegree > this.selectedTest.exameTotal) {
        alert(
          'نتيجه الاختبار يجب ان تكون اقل من او تساوي  ' +
            this.selectedTest.exameTotal
        );
        return;
      }
      if (!question.choiceCorrect) {
        alert('يجب اختيار اجابة قبل الحفظ ');
        return;
      }
      this.loading = true;
      this.sectionService.updateQuestion(question).subscribe({
        next: (response) => {
          alert('تم تعديل السؤال بنجاح');
          this.loading = false;
        },
        error: (error) => {
          alert('حدث خطأ ما ولم يتم تعديل السؤال');
          this.loading = false;

          console.error('Error submitting form:', error);
        },
        complete: () => {
          console.log('Form submission completed');
        },
      });

      this.selectedTest.exameQuestions.push(question);
    }
    this.showAddMcqModal = false;
    this.showAddTfModal = false;
  }
  onDeleteQuestion(questionId: number): void {
    if (this.selectedTest?.exameQuestions) {
      this.selectedTest.exameQuestions =
        this.selectedTest.exameQuestions.filter((q) => q.id !== questionId);
      this.loading = true;
      this.sectionService.deleteQuestion(questionId).subscribe({
        next: (response) => {
          alert('تم حذف السؤال بنجاح');
          this.loading = false;
        },
        error: (error) => {
          alert('حدث خطأ ما ولم يتم حذف السؤال');
          this.loading = false;

          console.error('Error submitting form:', error);
        },
        complete: () => {
          console.log('Form submission completed');
        },
      });
    }
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }
  dropSection(event: CdkDragDrop<any[]>) {
    if (event.previousIndex !== event.currentIndex) {
      const sections = [...this.sections];
      moveItemInArray(sections, event.previousIndex, event.currentIndex);
      this.sections = sections;
      console.log('تم تبديل الأقسام:', this.sections);
    }
  }
}
