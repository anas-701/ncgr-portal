import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Section } from '../../../../models/section.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SectionsService } from '../../../../services/training-content-service';

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
constructor(
    private sectionService: SectionsService,
  ) {}
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
    this.sectionService.updateSection(requst)
      .subscribe({
      next: (response) => {
       alert('تم تعديل القسم بنجاح');
        document.getElementById('closeModalBtn')?.click();
      },
      complete: () => {
        console.log('Form submission completed');
      },
      error: (error) => {
         alert('حدث خطأ ما ولم يتم تعديل القسم');
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
