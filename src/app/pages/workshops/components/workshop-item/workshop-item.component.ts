import { ChangeDetectorRef, Component, DestroyRef, inject, Input, OnInit, output } from '@angular/core';
import { WorkshopDTO } from '../../model/workshop.interface';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { WorkshopService } from '../../services/workshop.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-workshop-item',
  imports: [
    RouterLink,
    DatePipe
  ],
  templateUrl: './workshop-item.component.html',
  styleUrl: './workshop-item.component.scss'
})
export class WorkshopItemComponent{

  @Input() workshop?: WorkshopDTO;
  @Input() workshopTypes?: any[];

  _workshopService=inject(WorkshopService);
  _destroyRef=inject(DestroyRef)
  onChangeStatus=output()
  onModel=output<any>();

  model!: string;
  openModel(type: string,row:any) {
    const data = {
      type,
      row
    }
    this.onModel.emit(data)
  }
  onChange(e:any,workshopId:any){
    const statusId:number=+e.target.value
    this._workshopService.updateWorkshopStatus(workshopId,statusId)
    .pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next:(res)=>{
        this.onChangeStatus.emit()
      }
    })
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
