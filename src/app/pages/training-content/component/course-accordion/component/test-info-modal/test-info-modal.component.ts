import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lecture, Question } from '../../../../models/section.model';
import { SectionsService } from '../../../../services/training-content-service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-test-info-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-info-modal.component.html',
  styleUrls: ['./test-info-modal.component.scss']
})
export class TestInfoModalComponent  {
  @Input() isOpen = false;
  @Input() lecture: Lecture | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() editQuestion = new EventEmitter<Question>();
  @Output() deleteQuestion = new EventEmitter<number>();
  constructor(private sectionService: SectionsService,private sanitizer: DomSanitizer) {}

 ngOnChanges(): void {

    if (this.lecture) {
      this.getLectureById(this.lecture.id);
      if(this.lecture.typeId === 6)
      this.getQuestions(this.lecture.id);
     
    }
  }

  getQuestions(lectureId: number) {
    const body = {
        pageNumber: 1,
        pageSize: 10,
        filter: {
          exameId: this.lecture?.id,
        }
    }
    this.sectionService.getLectureQuestions(body).subscribe({
      next: (res) => {
        this.lecture = this.lecture ? { ...this.lecture, exameQuestions: res.data.result } : null;
      },
      error: (err) => {
        console.error('Error fetching questions:', err);
      }
    });
  }
  getLectureById(id: number): void {
  this.sectionService.getLectureById(id).subscribe({
      next: (response) => {
        this.lecture = response.data;
            },
      error: (error) => {
        console.error('Error fetching sections:', error);
      }
    });
}

  getTotalScore(): number {
    return this.lecture?.exameQuestions?.reduce((sum, q) => sum + q.questionDegree, 0) || 0;
  }

  closeModal() {
    this.close.emit();
  }

  onEditQuestion(question: Question) {
    this.editQuestion.emit(question);
    this.closeModal();
  }

  onDeleteQuestion(questionId: number) {
    this.deleteQuestion.emit(questionId);
    this.closeModal();
  }
  getSafePdfUrl() { 
  if (!this.lecture || !this.lecture.pdfFile) {
    return null;
  }
  if(this.lecture.pdfFileName)
  return this.sanitizer.bypassSecurityTrustResourceUrl(this.lecture.pdfFileName);
else
  return null;
}
}