import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { WorkshopItemComponent } from './components/workshop-item/workshop-item.component';
import { WorkshopDTO } from './model/workshop.interface';
import { RouterLink } from '@angular/router';
import { WorkshopReschedulingComponent } from './components/workshop-rescheduling/workshop-rescheduling.component';
import { WorkshopService } from './services/workshop.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { AppLookUpServiceService } from '../../@core/services/app-look-up-service.service';
import { SharedPaginationComponent } from '../../@shared/shared-pagination/shared-pagination.component';
import { WorkshopFilterComponent } from './components/workshop-filter/workshop-filter.component';
@Component({
  selector: 'app-workshops',
  imports: [
    SideBarComponent,
    WorkshopItemComponent,
    RouterLink,
    WorkshopReschedulingComponent,
    SharedPaginationComponent,
    WorkshopFilterComponent
  ],
  templateUrl: './workshops.component.html',
  styleUrl: './workshops.component.scss'
})
export class WorkshopsComponent implements OnInit{
  _workshopService=inject(WorkshopService);
  _lookupService=inject(AppLookUpServiceService)
  _destroyRef=inject(DestroyRef)
  workshops: WorkshopDTO[] = [];  
  model!:string;
  workshopTypes:any[]=[];
  isLoading!:boolean;
  selectedRow!:WorkshopDTO;
  currentPage:number = 1;
  totalPages:number = 1;
  pageSize:number = 3;
  totalItems:number = 0;
  filter:any
  ngOnInit(): void {
    this.getLookupData()
    
  }
  getLookupData(){
    this._lookupService.getAllWorkshopTypes().pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next:(res)=>{
        this.workshopTypes=res.result;
        this.getData()
      }
    })
  }
  getData(){
    this.filter = {
      "pageNumber": this.currentPage+1,
      "pageSize": this.pageSize,
      "filter": {
        "isActive": true,
        "isNotActive": true,
        "isArabic": false,
        "isEnglish": true,
        "isInSite": true,
        "isRemote": true,
        "categoryId": 0,
        "countTrainerOrder": 0,
        "evaluationOrder": 0
      },
      // "orderByValue": [
      //   {
      //     "colId": "string",
      //     "sort": "string"
      //   }
      // ]
    }
    this.isLoading=true
    this._workshopService.getAllWorkshops(this.filter).pipe(
      finalize(()=>this.isLoading=false),
      takeUntilDestroyed(this._destroyRef)
    ).subscribe({
      next:(res)=>{
        this.workshops=res.data.result
        console.log(res)
      }
    })
  }
  onDelete(){
    this._workshopService.deleteWorkshop(this.selectedRow.id).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next:(res)=>{
        this.confirmDelete()
        
      }
    })
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
        this.getData()
      }
    }
  }
  onModel(e:any){
    this.model=e.type;
    this.selectedRow=e.row
  }
  onChangeStatus(){
    this.getData()
  }

  onPageChange(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.calculateTotalPages();
  }
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    if (this.totalPages === 0) {
      this.totalPages = 1;
    }
  }
  onFilter(e:any){
    this.filter={
      ...this.filter,
      ...e,
    }
    this.getData()
    console.log('onFilter',e)
  }
}
