import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SectionsService } from '../../../../services/training-content-service';
import { Lecture, Question } from '../../../../models/section.model';
import { ToasterService } from '../../../../../../@shared/toaster.service';

@Component({
  selector: 'app-add-mcq-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-mcq-modal.component.html',
  styleUrls: ['./add-mcq-modal.component.scss']
})
export class AddMcqModalComponent {
  @Input() isOpen = false;
  @Input() lecture: Lecture | null = null;
  @Input() question: Question | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  @Output() update = new EventEmitter<any>();

  newQuestion = {
    text: '',
    score: 1,
    options: [{
      id: 0,
      choice: '',
      isCorrect: false
    },{
      id: 0,
      choice: '',
      isCorrect: false
    }],
    correctAnswer: 0
  };
  editmode: boolean=false;
  constructor(private toaster: ToasterService) {}
  ngOnChanges(): void {
    if (this.question) {
      this.editmode=true
      this.newQuestion = {
        text: this.question.question,
        score: this.question.questionDegree,
        options: this.question.questionChoics.map((option, index) => ({
          id: index,
          choice: option.choice,
          isCorrect: option.isCorrect
        })),
        correctAnswer: this.question.choiceCorrect === this.question.choiceOne ? 0 : 1
      };
    }
  }
  addOption() {
    this.newQuestion.options.push({
      id: 0,
      choice: '',
      isCorrect: false
    });
  }

  removeOption(index: number) {
    this.newQuestion.options.splice(index, 1);
    if (this.newQuestion.correctAnswer >= index) {
      this.newQuestion.correctAnswer = Math.max(0, this.newQuestion.correctAnswer - 1);
    }
  }

  onSave() {
    if (!this.isValidQuestion()){
      this.toaster.error('تأكد من اضافه سؤالين على الاقل وادخال كل الحقول المطلوبة')
      return
    }
    
    const question :Question= {
      id:0,
      trainingProgramContentDetailsId: this.lecture?.id,
      questionTypeId: '1',
      question: this.newQuestion.text,
      questionDegree: this.newQuestion.score,
      choiceOne: this.newQuestion.options[0].choice,
      choiceTwo: this.newQuestion.options[1].choice,
      choiceCorrect: this.newQuestion.options[this.newQuestion.correctAnswer].choice,
      questionChoics: this.newQuestion.options.map((option, index) => ({
        id: 0,
        choice: option.choice,
        isCorrect: index === this.newQuestion.correctAnswer
      }))
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
    this.resetForm();
  }
  resetForm() {
    this.newQuestion = {
      text: '',
      score: 1,
       options: [{
      id: 0,
      choice: '',
      isCorrect: false
    }],
      correctAnswer: 0
    };
  }
  isValidQuestion(): boolean {
    debugger
  const { text, score, options } = this.newQuestion;

  if (!text.trim()) return false;
  if (score <= 0) return false;
  if (options.length < 2) return false;
  if (!options.every(opt => opt.choice.trim())) return false;
  // if (!options.some(opt => opt.isCorrect)) return false;

  return true;
}
}