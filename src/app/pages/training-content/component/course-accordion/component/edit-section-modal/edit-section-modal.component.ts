import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Section } from '../../../../models/section.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SectionsService } from '../../../../services/training-content-service';
import { ToasterService } from '../../../../../../@shared/toaster.service';

@Component({
  selector: 'app-edit-section-modal',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-section-modal.component.html',
  styleUrls: ['./edit-section-modal.component.scss']
})
export class EditSectionModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() section?: Section;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Section>();

  editedSection!: Section;
constructor( private sectionService: SectionsService,private toaster: ToasterService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['section'] && this.section) {
      this.editedSection = { ...this.section };
    }
  }

  onSave(): void {
    const requst={
      id: this.editedSection.id,
      trainingProgramId: this.editedSection.trainingProgramId,
      nameAr: this.editedSection.titleAr,
      nameEn: this.editedSection.titleEn,
    }
      const arabicRegex = /^[\u0600-\u06FF\s]+$/;
        const englishRegex = /^[A-Za-z\s]+$/;

        const isArabicTitleValid = arabicRegex.test(requst.nameAr?.trim() || '');
        const isEnglishTitleValid = englishRegex.test(requst.nameAr?.trim() || '');

        if (!isArabicTitleValid || !isEnglishTitleValid){
          
          this.toaster.error('الرجاء التأكد من صحة العناوين المدخلة');
          return;
        } 
    this.sectionService.updateSection(requst)
      .subscribe({
      next: (response) => {
       this.toaster.success('تم تعديل القسم بنجاح');
        document.getElementById('closeModalBtn')?.click();
      },
      complete: () => {
        console.log('Form submission completed');
      },
      error: (error) => {
         this.toaster.error('حدث خطأ ما ولم يتم تعديل القسم');
        console.error('Error submitting form:', error);
      
      }
  })
    this.save.emit(this.editedSection);
    this.closeModal();
  }

  closeModal(): void {
    this.close.emit();
  }
}
