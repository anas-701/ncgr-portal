import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ReportCardData {
  title: string;
  creator: string;
  createdDate: string;
  approver: string;
  approvedDate: string;
  category: string;
  participants: number;
  rating: string;
  tags: string[];
  postType: string;
  postDate: string;
  statusOptions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  constructor() {}

  getReportCards(): Observable<ReportCardData[]> {
    const mockData: ReportCardData[] = [
      {
        title: 'تطوير مهارات إعداد التقارير الرقابية',
        creator: 'محمد خالد',
        createdDate: '12/5/2025',
        approver: 'محمد خالد',
        approvedDate: '12/5/2025',
        category: 'الجهات الحكومية',
        participants: 30,
        rating: '5/0',
        tags: ['إعداد التقارير', 'بالعربية'],
        postType: 'نوع المنشور',
        postDate: '2025-04-29',
        statusOptions: ['مراجعة', 'مقبول', 'مرفوض']
      },
    ];
    return of(mockData); // simulate API call
  }
}
