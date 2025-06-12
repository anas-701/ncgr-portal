import { Component, ViewChild } from '@angular/core';
import { SideBarComponent } from "../../side-bar/side-bar.component";
import { SharedTableComponent } from "../../../@shared/shared-table/shared-table.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certificates-info',
  imports: [SideBarComponent, RouterModule, SharedTableComponent,CommonModule],
  templateUrl: './certificates-info.component.html',
  styleUrl: './certificates-info.component.scss'
})
export class CertificatesInfoComponent {
    @ViewChild('sharedTable') sharedTable!: SharedTableComponent;

    selectedRows: any[] = [];

 data = [
    { 
      id: 1, 
      traineeId: '1009281728',
      traineeName: 'سالم محمد خالد قاسم', 
      trainingTitle: 'التعاقد الرقمي', 
      certificateStatus: 'مصدرة',
      certificateNumber: '109218291',
      issueDate: '2025/01/02',
      actionType: 'cancel' ,
       selected: false
    },
    { 
      id: 2, 
      traineeId: '1009000728',
      traineeName: 'فاتن عبد الله علي محمد', 
      trainingTitle: 'التعاقد الرقمي', 
      certificateStatus: 'ملغية',
      certificateNumber: '109213391',
      issueDate: '2025/01/02',
      actionType: 'refresh' ,
       selected: false
    },
    { 
      id: 3, 
      traineeId: '1329000728',
      traineeName: 'ليلى محمد عبد العزيز حاتم', 
      trainingTitle: 'التعاقد الرقمي', 
      certificateStatus: 'مرفوضة',
      certificateNumber: '239213391',
      issueDate: '-',
      actionType: 'approve',
       selected: false
    },
    { 
      id: 4, 
      traineeId: '1920192807',
      traineeName: 'سارة عبد الله ريان محمد', 
      trainingTitle: 'الامتثال القانوني والالتزام في انتظار الموافقة', 
      certificateStatus: 'في انتظار الموافقة',
      certificateNumber: '109213391',
      issueDate: '-',
      actionType: 'multiple',
       selected: false
    },
    { 
      id: 5, 
      traineeId: '1765905432',
      traineeName: 'حاتم عبد العزيز وليد أحمد', 
      trainingTitle: 'الامتثال القانوني والالتزام في انتظار الموافقة', 
      certificateStatus: 'في انتظار الموافقة',
      certificateNumber: '109213391',
      issueDate: '-',
      actionType: 'multiple',
       selected: false
    }
  ];

  columns = [
    { header: 'اسم المتدرب', field: 'traineeName' },
    { header: 'رقم الهوية', field: 'traineeId' },
    { header: 'عنوان التدريب', field: 'trainingTitle' },
    { header: 'حالة الشهادة', field: 'certificateStatus' },
    { header: 'رمز الشهادة', field: 'certificateNumber' },
    { header: 'تاريخ الإصدار', field: 'issueDate' }
  ];
onSelectionChange(selectedRows: any[]): void {
    this.selectedRows = selectedRows;
    console.log('Selected rows in parent:', selectedRows);
    
    if (selectedRows.length > 0) {
      console.log(`تم تحديد ${selectedRows.length} عنصر`);
    } else {
      console.log('لا توجد عناصر محددة');
    }
  }

  approveSelected(): void {
    if (this.selectedRows.length > 0) {
      console.log('الموافقة على العناصر المحددة:', this.selectedRows);
    }
  }

  rejectSelected(): void {
    if (this.selectedRows.length > 0) {
      console.log('رفض العناصر المحددة:', this.selectedRows);
    }
  }

  clearAllSelection(): void {
    if (this.selectedRows.length > 0) {
      console.log('إلغاء تحديد جميع العناصر');
      this.clearTableSelection();
    }
  }

  clearTableSelection(): void {
    this.data.forEach(item => item.selected = false);
    this.selectedRows = [];
  }
}
