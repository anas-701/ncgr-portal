import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Question } from '../../../../models/section.model';
import { ToasterService } from '../../../../../../@shared/toaster.service';

@Component({
  selector: 'app-add-tf-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-tf-modal.component.html',
  styleUrls: ['./add-tf-modal.component.scss']
})
export class AddTfModalComponent {
  @Input() isOpen = false;
  @Input() question: Question | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();

  newQuestion = {
    text: '',
    score: 1,
    correctAnswer: true
  };
 editmode: boolean=false;
    constructor(private toaster: ToasterService) {}
  
  ngOnChanges(): void {
    if (this.question) {
      this.editmode=true
      this.newQuestion = {
        text: this.question.question,
        score: this.question.questionDegree,
        correctAnswer: this.question.choiceCorrect === 'true'
      };
    }}
  onSave() {
    if(!this.isQuestionValid()){
       this.toaster.error('تأكد من اختيار الاجابه الصحيحه وادخال كل الحقول المطلوبة')
      return
    }
    const question :Question= {
          id:0,
          trainingProgramContentDetailsId:0,
          questionTypeId: '2',
          question: this.newQuestion.text,
          questionDegree: this.newQuestion.score,
          choiceOne: '',
          choiceTwo:'',
          choiceCorrect: this.newQuestion.correctAnswer.toString(),
          questionChoics: []
        };
    if (this.editmode) {
      question.id = this.question?.id || 0;
      question.trainingProgramContentDetailsId = this.question?.trainingProgramContentDetailsId || 0;
      this.update.emit(question);
    }
    else 
    this.save.emit(question);
    this.closeModal();
  }

  closeModal() {
    this.close.emit();
  }
  isQuestionValid(): boolean {
  const { text, score, correctAnswer } = this.newQuestion;
  const isTextValid = text.trim().length >= 3;
  const isScoreValid = typeof score === 'number' && score > 0;
  const isCorrectAnswerValid = typeof correctAnswer === 'boolean';

  return isTextValid && isScoreValid && isCorrectAnswerValid;
}
}