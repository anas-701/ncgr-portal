import { Injectable } from '@angular/core';
import { Section } from '../models/lecture.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private sections: Section[] = [
    {
      id: 1,
      title: 'تمهيد',
      lectures: [
        { id: 1, title: 'مقدمة عن التعاقد الرقمي', type: 'text', icon: 'acc_icon_41.svg' },
        { id: 2, title: 'الأساسيات القانونية للتعاقد الرقمي', type: 'video', icon: 'acc_icon_40.svg' },
        { id: 3, title: 'أدوات وتقنيات التعاقد الرقمي', type: 'pdf', icon: 'acc_icon_42.svg' },
        { id: 4, title: 'أمن المعلومات في التعاقد الرقمي', type: 'audio', icon: 'acc_icon_43.svg' },
        { id: 5, title: 'انفوجرافيك لانواع العقود الرقمية', type: 'image', icon: 'acc_icon_44.svg' },
        { id: 6, title: 'اختبر معلوماتك', type: 'quiz', icon: 'acc_icon_41.svg' }
      ]
    }
  ];

  getSections(): Section[] {
    return this.sections;
  }
}
