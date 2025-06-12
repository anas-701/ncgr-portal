import { Component, OnInit } from '@angular/core';
import { SideBarComponent } from '../../side-bar/side-bar.component';
import { SharedTableComponent } from '../../../@shared/shared-table/shared-table.component';
import { data } from './workshop-enrollments.fake';
import { EnrollmentType } from '../enum/enrollment-type';

@Component({
  selector: 'app-workshop-enrollments',
  imports: [SideBarComponent,SharedTableComponent],
  templateUrl: './workshop-enrollments.component.html',
  styleUrl: './workshop-enrollments.component.scss'
})
export class WorkshopEnrollmentsComponent implements OnInit{
 
  data:any;
  EnrollmentType=EnrollmentType;
  selectedRow:any;
  ngOnInit(): void {
    this.data=data.map(obj=>{
      return {
        ...obj,
        registrationStatusLabel:obj.registrationStatus===EnrollmentType.Registered?'مسجل':'غير مسجل'
      }
    });
  }
  columns = [
    { header: 'رقم الهوية', field: 'nationalId' },
    { header: 'الاسم', field: 'name' },
    { header: 'البريد الالكتروني', field: 'email' },
    { header: 'القطاع', field: 'sector' },
    { header: 'حالة التسجيل', field: 'registrationStatusLabel' },
    { header: 'تاريخ التسجيل', field: 'registrationDate' },
    { header: 'الإكمال', field: 'completion' },
    { header: 'تاريخ الإكمال', field: 'completionDate' }
  ];
  
}
