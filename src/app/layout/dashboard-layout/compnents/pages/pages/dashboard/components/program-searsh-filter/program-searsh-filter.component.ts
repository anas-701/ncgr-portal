import { I } from '@angular/cdk/a11y-module.d-DBHGyKoh';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppLookUpResponse } from '../../../../../../../../@models/app-lookup-response.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-program-searsh-filter',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './program-searsh-filter.component.html',
  styleUrl: './program-searsh-filter.component.scss',
})
export class ProgramSearshFilterComponent implements OnInit{
  @Output() addProgram = new EventEmitter<void>();
  @Output() toggleStatus  = new EventEmitter<string>();
  @Output() loadPrograms = new EventEmitter<void>();
  @Output() resetFilters = new EventEmitter<void>();
  @Input() searchForm!: FormGroup ;
  @Input() category: AppLookUpResponse[] = [];
  @Input() paths: AppLookUpResponse[] = [];
  @Input() tags: AppLookUpResponse[] = [];
  @Input() showRate:boolean=true;
  isActive: boolean = true;
  isNotActive: boolean = false;
  isArabic: boolean = true;
  isEnglish: boolean = false;
  ngOnInit(): void {}
  
  onAddProgram() {
    this.addProgram.emit();
  }
   onLoadProgram() {
    this.loadPrograms.emit();
  }
  onResetFilters() {
    this.resetFilters.emit();
  }
}
