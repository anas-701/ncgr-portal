import { Component } from '@angular/core';
import { SideBarComponent } from '../../../side-bar/side-bar.component';
import { SharedTableComponent } from '../../../../@shared/shared-table/shared-table.component';
import { data } from './workshop-requirement-grades.fake';
import { ExamStatus } from '../../enum/exam-status';

@Component({
  selector: 'app-workshop-requirement-grades',
  imports: [SideBarComponent, SharedTableComponent],
  templateUrl: './workshop-requirement-grades.component.html',
  styleUrl: './workshop-requirement-grades.component.scss'
})
export class WorkshopRequirementGradesComponent {
  data: any;
  ngOnInit(): void {
    this.data = data.map(obj => {
      return {
        ...obj,
        resultLabel: obj.result === ExamStatus.Passed ? 'مجتاز' : obj.result === ExamStatus.Pending ? 'في انتظار رصد الدرجة' : 'غير مجتاز'
      }
    });
  }
  columns = [
    { header: 'الاسم', field: 'studentName' },
    { header: 'رقم الهوية', field: 'nationalId' },
    { header: 'البريد الإلكتروني', field: 'email' },
    { header: 'النتيجة', field: 'resultLabel' },
    // { header: 'الدرجة', field: 'score' },
  ];
}
