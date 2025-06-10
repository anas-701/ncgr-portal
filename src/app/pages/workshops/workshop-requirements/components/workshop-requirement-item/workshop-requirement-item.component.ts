import { Component, Input, output } from '@angular/core';
export interface WorkshopSession {
  id: number;
  title: string;
  type: 'session' | 'online-quiz' | 'offline-exam';
  date?: string;
  time?: string;
  duration?: number;
  isRequired?: boolean;
  currentQuestions?: number;
  currentScore?: number;
  totalScore?: number;
  program?:string;
  questions?:workshopSessionQuestion[];
}
interface workshopSessionQuestion{
  id?:number
  text?:string
  options?:string[];
  correctAnswer?:string
  score?:number
}
@Component({
  selector: 'app-workshop-requirement-item',
  imports: [],
  templateUrl: './workshop-requirement-item.component.html',
  styleUrl: './workshop-requirement-item.component.scss'
})
export class WorkshopRequirementItemComponent {
  @Input() session!: WorkshopSession;
  onClick=output<WorkshopSession>()
  currentDate = new Date().toISOString().split('T')[0];
  workshopInfo: any = {
    id: 1,
    title: 'ورشة التقارير الرقابية',
    startDate: '2025-02-01',
    endDate: '2025-02-28',
    isPublished: true
  };
  getTooltipText(type: string, isRequired?: boolean): string {
    switch (type) {
      case 'session': return isRequired ? 'متطلب حضور' : 'جلسة';
      case 'online-quiz': return 'اختبار إلكتروني';
      case 'offline-exam': return 'اختبار حضوري';
      default: return '';
    }
  }

  getDateTooltip(type: string): string {
    switch (type) {
      case 'session': return 'تاريخ الجلسة';
      case 'offline-exam': return 'تاريخ الاختبار';
      default: return 'التاريخ';
    }
  }

  canRegisterAttendance(session: WorkshopSession): boolean {
    return session.date === this.currentDate &&
      this.isDateWithinWorkshopPeriod(session.date || '');
  }

  canGradeExam(session: WorkshopSession): boolean {
    return session.date === this.currentDate &&
      this.isDateWithinWorkshopPeriod(session.date || '');
  }

  isDateWithinWorkshopPeriod(date: string): boolean {
    const sessionDate = new Date(date);
    const startDate = new Date(this.workshopInfo.startDate);
    const endDate = new Date(this.workshopInfo.endDate);
    return sessionDate >= startDate && sessionDate <= endDate;
  }

  isValidSessionDate(date: string): boolean {
    return this.isDateWithinWorkshopPeriod(date);
  }

  onAttendanceClick(session: WorkshopSession): void {
    console.log('تسجيل الحضور للجلسة:', session.title);
  }

  onAddQuestionClick(session: WorkshopSession): void {
    console.log('إضافة سؤال للاختبار:', session.title);
  }

  onViewQuestionsClick(session: WorkshopSession) {
    this.onClick.emit(session)
  }

  onGradeExamClick(session: WorkshopSession): void {
    console.log('رصد درجات الاختبار:', session.title);
  }
  onDeleteClick(session:any){
    this.onClick.emit(session)
  }
  onEditClick(session:any){
    this.onClick.emit(session)
  }
}
