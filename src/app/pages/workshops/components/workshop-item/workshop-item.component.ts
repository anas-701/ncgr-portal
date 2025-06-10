import { ChangeDetectorRef, Component, inject, Input, output } from '@angular/core';
import { WorkshopDTO } from '../../model/workshop.interface';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-workshop-item',
  imports: [
    RouterLink,
  ],
  templateUrl: './workshop-item.component.html',
  styleUrl: './workshop-item.component.scss'
})
export class WorkshopItemComponent {
  @Input() workshop?: WorkshopDTO;
  onModel=output<string>()
  model!: string;
  openModel(type: string) {
    this.onModel.emit(type)
  }
  // confirmDelete() {
  //   // هنا تحط الكود بتاع الحذف
  //   console.log('تم الحذف');

  //   // إغلاق الـ Modal بعد الحذف
  //   const modal = document.getElementById('exampleModal');
  //   if (modal) {
  //     const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modal);
  //     if (bootstrapModal) {
  //       bootstrapModal.hide();
  //     }
  //   }
  // }

}
