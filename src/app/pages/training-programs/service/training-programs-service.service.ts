import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ACourse } from '../training-programs.component';

@Injectable({
  providedIn: 'root'
})
export class TrainingProgramsService {
  getCourses(): Observable<ACourse[]> {
    return of([
      {
        title: 'دورة إدارة المشاريع',
        image: 'assets/images/course1.jpg',
        ratingText: '4.5',
        government: 'وزارة التعليم',
        description: 'وصف الدورة التدريبية...',
        reportText: '12 تقرير',
        language: 'العربية'
      },
      {
        title: 'تحليل البيانات',
        image: 'assets/images/course2.jpg',
        ratingText: '4.8',
        government: 'وزارة الاقتصاد',
        description: 'شرح لأهم مفاهيم تحليل البيانات.',
        reportText: '20 تقرير',
        language: 'الإنجليزية'
      }
    ]);
  }
}
