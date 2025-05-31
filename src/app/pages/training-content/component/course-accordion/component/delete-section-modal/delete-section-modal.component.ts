import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SectionsService } from '../../../../services/training-content-service';

@Component({
  selector: 'app-delete-section-modal',
  templateUrl: './delete-section-modal.component.html',
  styleUrls: ['./delete-section-modal.component.scss']
})
export class DeleteSectionModalComponent {
  @Input() isOpen = false;
  @Input() sectionTitle = '';
  @Input() sectionId : any;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
  constructor(
    private sectionService: SectionsService ){}
  closeModal(): void {
    this.close.emit();
  }

  onConfirm(): void {
    this.sectionService.deleteSection(this.sectionId)
      .subscribe({
      next: (response) => {
       alert('تم حذف القسم بنجاح');
        document.getElementById('closeModalBtn')?.click();
      },
      complete: () => {
        console.log('Form submission completed');
      },
      error: (error) => {
         alert('حدث خطأ ما ولم يتم حذف القسم');
        console.error('Error submitting form:', error);
      
      }
  })
    this.confirm.emit();
    this.closeModal();
  }
}