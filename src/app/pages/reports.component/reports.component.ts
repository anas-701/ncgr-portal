import { Component } from '@angular/core';
import { SideBarComponent } from "../side-bar/side-bar.component";


// تعريف واجهة لنوع بيانات الشهادة
interface Certificate {
  traineeName: string;
  sector: string;
  entity: string;
  serviceType: string;
  serviceName: string;
  certificateCode: string;
  validity: string;
  issueMethod: 'تلقائيًا' | 'يدويًا'; // تحديد القيم المحتملة لطريقة الإصدار
  issueDate: string;
}


@Component({
  selector: 'app-reports.component',
  imports: [SideBarComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {

  


}
