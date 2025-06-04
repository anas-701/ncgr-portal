import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { WorkshopDTO } from '../../model/workshop.interface';
import { RouterLink } from '@angular/router';
import { WorkshopReschedulingComponent } from '../workshop-rescheduling/workshop-rescheduling.component';
@Component({
  selector: 'app-workshop-item',
  imports: [
    RouterLink,
    WorkshopReschedulingComponent
  ],
  templateUrl: './workshop-item.component.html',
  styleUrl: './workshop-item.component.scss'
})
export class WorkshopItemComponent {
  @Input() workshop!: WorkshopDTO;
  model!:string;
  _cdref=inject(ChangeDetectorRef)
  openModel(type:string){
    this.model=''
    this.model=type;
    console.log(this.model)
  }
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
  
}
