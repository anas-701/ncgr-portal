import { Component, DestroyRef, inject, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { AppLookUpServiceService } from '../../../../@core/services/app-look-up-service.service';

@Component({
  selector: 'app-workshop-filter',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './workshop-filter.component.html',
  styleUrl: './workshop-filter.component.scss'
})
export class WorkshopFilterComponent implements OnInit {
  filterForm!: FormGroup;
  onFilter=output<any>();
  _appLookUpService=inject(AppLookUpServiceService)
  _destroyRef=inject(DestroyRef)
  lookupData:any;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getLookupData()
  }
  getLookupData() {
    combineLatest({
      category: this._appLookUpService.getAllCategories()
    }).pipe(takeUntilDestroyed(this._destroyRef)).subscribe((res) => {
      this.lookupData = res;
      this.initForm()
    });
  }
  initForm(){
    this.filterForm = this.fb.group({
      isActive: [],
      isNotActive: [],
      isArabic: [],
      isEnglish: [],
      isInSite: [],
      isRemote: [],
      categoryId: [0],
      countTrainerOrder: ['desc'], // or 'asc'
      evaluationOrder: ['desc']     // or 'asc'
    });
  }
  applyFilters(): void {
    this.onFilter.emit(this.filterForm.value)
    console.log(this.filterForm.value);
  }

  resetFilters(): void {
    this.filterForm.reset();
    this.onFilter.emit(this.filterForm.value)
  }

}
