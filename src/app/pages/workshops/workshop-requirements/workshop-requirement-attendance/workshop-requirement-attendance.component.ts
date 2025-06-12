import { Component } from '@angular/core';
import { SideBarComponent } from '../../../side-bar/side-bar.component';
import { SharedTableComponent } from '../../../../@shared/shared-table/shared-table.component';
import { EnrollmentType } from '../../enum/enrollment-type';
import { data } from './workshop-requirement-attendance.fake';
import { AttendanceStatus } from '../../enum/attendance-status';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workshop-requirement-attendance',
  imports: [
    SideBarComponent,
    SharedTableComponent,
    FormsModule
  ],
  templateUrl: './workshop-requirement-attendance.component.html',
  styleUrl: './workshop-requirement-attendance.component.scss'
})
export class WorkshopRequirementAttendanceComponent {
  data:any;
  ngOnInit(): void {
    this.data=data.map(obj=>{
      return {
        ...obj,
        attendanceStatus:obj.isPresent===AttendanceStatus.Present?'حاضر':obj.isPresent===AttendanceStatus.Absent?'غائب':'في انتظار رصد الحضور'
      }
    });
  }
  columns = [
    { header: 'رقم الهوية', field: 'nationalId' },
    { header: 'الاسم', field: 'name' },
    { header: 'البريد الإلكتروني', field: 'email' },
    { header: 'حالة الحضور', field: 'attendanceStatus' },
  ];
}
