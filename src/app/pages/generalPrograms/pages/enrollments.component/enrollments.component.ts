import { Component } from '@angular/core';
import { SideBarComponent } from "../../../side-bar/side-bar.component";
import { CommonModule } from '@angular/common';

interface Tag {
  id?: 1; 
  titleAr: string;
  titleEn: string;
  statusId: boolean;
}

@Component({
  selector: 'app-enrollments.component',
  imports: [SideBarComponent,CommonModule],
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss'
})
export class EnrollmentsComponent {
  showModal = false;

  // #############################################################
  showDeleteConfirmationModal: boolean = false; 
  selectedTagToDelete: Tag | null = null; 
  processingDelete: boolean = false; 
  deleteError: string = ''; 
  deleteSuccess: string = '';
  // #############################################################



  openDeleteConfirmation(): void {
    // this.selectedTagToDelete = tag; 
    this.deleteError = ''; 
    this.deleteSuccess = ''; 
    this.showDeleteConfirmationModal = true; 
  }


   onConfirmDeleteTag(id: number): void {
    this.processingDelete = true; 
    this.deleteError = '';

    console.log(`بدء عملية حذف الوسم بالمعرف: ${id}`);

    setTimeout(() => {
      this.processingDelete = false; 

      this.deleteSuccess = `تم حذف الوسم بنجاح!`;
      console.log(`تم حذف الوسم بالمعرف ${id} بنجاح.`);

      setTimeout(() => {
        this.onCloseDeleteConfirmationModal(); 
      }, 1500);
    }, 2000); 
  }

   onCloseDeleteConfirmationModal(): void {
    this.showDeleteConfirmationModal = false;
    this.selectedTagToDelete = null; 
    this.processingDelete = false; 
    this.deleteError = '';
    this.deleteSuccess = ''; 
    console.log('تم إلغاء أو إغلاق مودال الحذف.');
  }



}
