import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { WorkshopItemComponent } from './components/workshop-item/workshop-item.component';
import { WorkshopDTO } from './model/workshop.interface';
import { workshops } from './workshop.fake';
import { RouterLink } from '@angular/router';
import { WorkshopReschedulingComponent } from './components/workshop-rescheduling/workshop-rescheduling.component';
@Component({
  selector: 'app-workshops',
  imports: [
    SideBarComponent,
    WorkshopItemComponent,
    RouterLink,
    WorkshopReschedulingComponent
  ],
  templateUrl: './workshops.component.html',
  styleUrl: './workshops.component.scss'
})
export class WorkshopsComponent {
  workshops: WorkshopDTO[] = workshops;  
  model!:string;
  confirmDelete() {
    // هنا تحط الكود بتاع الحذف
    console.log('تم الحذف');

    // إغلاق الـ Modal بعد الحذف
    const modal = document.getElementById('exampleModal');
    if (modal) {
      const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modal);
      if (bootstrapModal) {
        bootstrapModal.hide();
      }
    }
  }
  onModel(e:string){
    console.log('onModel',e)
    this.model=e
  }
}
