import { Component } from '@angular/core';
import { SideBarComponent } from "../side-bar/side-bar.component";
import { RouterModule } from '@angular/router';
import { SharedTableComponent } from "../../@shared/shared-table/shared-table.component";

@Component({
  selector: 'app-certificates',
  imports: [SideBarComponent, RouterModule, SharedTableComponent],
  standalone:true,
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.scss'
})
export class CertificatesComponent {
data = [
  { id: 1, templateName: 'نموذج A', isCustom: true, requiresApproval: false, fakeCertificates: 2, approvedCertificates: 5 },
  { id: 2, templateName: 'نموذج B', isCustom: false, requiresApproval: true, fakeCertificates: 1, approvedCertificates: 3 },
  { id: 3, templateName: 'نموذج C', isCustom: true, requiresApproval: false, fakeCertificates: 0, approvedCertificates: 7 }
];;

columns = [
  { header: 'اسم القالب', field: 'templateName' },
  { header: 'مخصص', field: 'isCustom' },
  { header: 'يتطلب الموافقة', field: 'requiresApproval' },
  { header: 'الشهادات ', field: 'fakeCertificates' },
  { header: 'الشهادات الموافقة', field: 'approvedCertificates' }
];

}
