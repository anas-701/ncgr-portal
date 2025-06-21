import { Component, OnInit } from '@angular/core';
import { SideBarComponent } from '../../side-bar/side-bar.component';
import {
  Form,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Tag {
  id?: 1; 
  titleAr: string;
  titleEn: string;
  statusId: boolean;
}

@Component({
  selector: 'app-tag-create.component',
  imports: [SideBarComponent, ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './tag-create.component.html',
  styleUrl: './tag-create.component.scss',
})
export class TagCreateComponent  implements OnInit {
  searchForm!: FormGroup;
  showModal = false;
  tagForm!: FormGroup;
  processingForm = false;
  formError = '';
  formSuccess = '';
  isActive= false;
  isNotActive = false;
  isArabic= false;
  isEnglish= false;
  // statusId = 1;
  isProcessing = false;
  isEditMode = false;
  currentTagId: number | null = null;


  // #############################################################
  showDeleteConfirmationModal: boolean = false; 
  selectedTagToDelete: Tag | null = null; 
  processingDelete: boolean = false; 
  deleteError: string = ''; 
  deleteSuccess: string = '';
  // #############################################################


  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      tagName: [''],
      status: this.fb.group({
        isActive: [false],
        isNotActive: [false],
      }),
      language: this.fb.group({
        arabic: [false],
        english: [false],
      }),
    });

    this.tagForm = this.fb.group({
      titleAr: ['', [Validators.required, Validators.pattern(/^[\u0600-\u06FF\s]+$/)]],
      titleEn: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      statusId: [false],
    });
  }

   ngOnInit(): void {
    this.tagForm.valueChanges.subscribe(value => {
      console.log('Tag Form Value Changed:', value);
    });

    this.tagForm.get('titleAr')?.valueChanges.subscribe(value => {
      console.log('Title (Arabic) Changed:', value);
    });

    this.tagForm.get('titleEn')?.valueChanges.subscribe(value => {
      console.log('Title (English) Changed:', value);
    });

    this.tagForm.get('statusId')?.valueChanges.subscribe(value => {
      console.log('Status ID Checkbox State Changed:', value); // ستكون true أو false
    });

  }


  onAddTag(): void {
    this.showModal = true;
    this.isEditMode = false;
    this.currentTagId = null; 
    this.tagForm.reset({ statusId: false });
    this.formError = '';
    this.formSuccess = '';
  }


  onEdit(tag: Tag): void { 
    this.isEditMode = true; 
    this.currentTagId = tag.id || null;
    this.formError = '';
    this.formSuccess = '';

    // ملء النموذج بالبيانات الحالية للوسم
    this.tagForm.patchValue({
      titleAr: tag.titleAr,
      titleEn: tag.titleEn,
      statusId: tag.statusId 
    });

    this.showModal = true;
    console.log('Opening for edit:', tag);
  }


  onCloseTag(): void {
    this.showModal = false;
    this.tagForm.reset({ statusId: false });
    this.formError = '';
    this.formSuccess = '';
    this.isEditMode = false;
    this.currentTagId = null;
  }

 

  onCreate(): void {
     if (this.tagForm.valid) {
      this.processingForm = true;
      this.formError = '';
      this.formSuccess = '';

        const tagData = {
        titleAr: this.tagForm.value.titleAr,
        titleEn: this.tagForm.value.titleEn,
        statusId: this.tagForm.value.statusId ? 1 : 0,
      };
        console.log('بيانات الوسم للإرسال:', tagData);


        if (this.isEditMode && this.currentTagId !== null) {
        console.log('Updating Tag with ID:', this.currentTagId, 'Data:', tagData);
        setTimeout(() => {
          this.processingForm = false;
          this.formSuccess = 'تم تحديث الوسم بنجاح!';
          console.log('Tag updated successfully:', tagData);
          this.onCloseTag();
        }, 2000);

      } else {
        console.log('Creating New Tag:', tagData);
        setTimeout(() => {
          this.processingForm = false;
          this.formSuccess = 'تم إنشاء الوسم بنجاح!';
          console.log('Tag created successfully:', tagData);
          this.onCloseTag();
        }, 2000);
      }

      
      setTimeout(() => {
        this.processingForm = false;
        this.formSuccess = 'تم إنشاء الوسم بنجاح!';
        console.log('تم إنشاء الوسم بنجاح:', tagData);
        this.onCloseTag();
      }, 2000);
  } else {
     this.formError = 'الرجاء إدخال البيانات المطلوبة بشكل صحيح.';
      this.tagForm.markAllAsTouched();
      console.log('الرجاء إدخال البيانات المطلوبة بشكل صحيح.');
  }
}

  onUpdateStatus(event: Event): void {
    console.log('Status Updated:', event);
  }

  // openTagCreateModal(): void {
  //   this.showModal = true;
  //   console.log('تم فتح إنشاء الوسم.');
  // }



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
