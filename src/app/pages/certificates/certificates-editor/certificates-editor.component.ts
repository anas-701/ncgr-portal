import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { initialCertificateData, CertificateElement } from './certificate-fields.mock';
import { SideBarComponent } from "../../side-bar/side-bar.component";
import { SharedDynamicFormComponent } from "../../../@shared/shared-dynamic-form/shared-dynamic-form.component";
import { FormFieldConfig } from '../../../@shared/shared-dynamic-form/interfaces/form-field-config.interface';
import { CustomValidators } from '../../../@shared/shared-dynamic-form/custom-validators';

@Component({
  selector: 'app-certificates-editor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SideBarComponent, SharedDynamicFormComponent],
  templateUrl: './certificates-editor.component.html',
  styleUrls: ['./certificates-editor.component.scss']
})
export class CertificatesEditorComponent implements OnInit {
   _route = inject(ActivatedRoute);
   _router = inject(Router);

  form: FormGroup = new FormGroup({});
  formFields: FormFieldConfig[] = [];
  certificateData = { templateSettings: initialCertificateData };
  certificateBackground: string | null = null;
  signatureImage: string | null = null;
  activeElement: CertificateElement | null = null;
  isDragging = false;
  dragOffset = { x: 0, y: 0 };
  draggedElements: Set<string> = new Set();

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.formFields = [
      {
        key: 'title',
        type: 'text',
        label: 'اسم القالب (بالعربية)',
        placeholder: 'أدخل اسم القالب بالعربية',
        styleClass: 'col-md-6',
        validators: [Validators.required, CustomValidators.arabicLetters],
      },
      {
        key: 'titleEn',
        type: 'text',
        label: 'اسم القالب (بالانجليزية)',
        placeholder: 'Enter the template name in English',
        styleClass: 'col-md-6 mb-2',
        validators: [Validators.required, CustomValidators.englishLetters],
      },
      {
        key: 'role',
        type: 'select',
        label: 'مخصص لـ',
        placeholder: 'اختر الفئة',
        styleClass: 'col-md-6 mb-2',
        validators: [Validators.required],
        options: [
          { label: 'الورش التتدريبية', value: '1' },
          { label: 'البرامج العامة', value: '2' },
        ],
      },
      {
        key: 'approve',
        type: 'radio',
        label: 'يتطلب موافقة',
        styleClass: 'col-md-2 mb-2',
        defaultValue: '2', 
        options: [
          { label: 'نعم', value: '1' },
          { label: 'لا', value: '2' },
        ],
      },
      {
        key: 'roles',
        type: 'select',
        label: 'المسؤل عن الموافقة',
        placeholder: 'اختر المسؤل',
        styleClass: 'col-md-4 mb-2',
        validators: [Validators.required],
        options: [
          { label: 'الرئيس التنفيذى', value: '1' },
        ],
        conditionalVisibility: {
          dependsOn: 'approve',
          condition: 'equals',
          value: '1',
        }
      },
      {
        styleClass: 'col-12',
      },
      {
        key: 'certificateValidity',
        type: 'radio',
        label: 'صلاحية الشهادة',
        styleClass: 'col-md-3 mb-2',
        defaultValue: '1', 
        options: [
          { label: 'محدده بمدة', value: '1' },
          { label: 'دائمة', value: '2' },
        ],
      },
      {
        key: 'time',
        type: 'select',
        label: 'حدد المدة',
        placeholder: 'اختر المدة',
        styleClass: 'col-md-4 mb-2',
        validators: [Validators.required],
        defaultValue: '2', 
        options: [
          { label: 'يوم', value: '1' },
          { label: 'شهر', value: '2' },
          { label: 'سنة', value: '3' },
        ],
        conditionalVisibility: {
          dependsOn: 'certificateValidity',
          condition: 'equals',
          value: '1',
        }
      },
      {
        key: 'titleE',
        type: 'text',
        label: ' ',
        placeholder: 'Enter extra text if needed',
        styleClass: 'col-md-5 mb-2',
        validators: [Validators.required, CustomValidators.englishLetters],
        conditionalVisibility: {
          dependsOn: 'certificateValidity',
          condition: 'equals',
          value: '1',
        }
      },
    ];
  }

  // File Upload Methods
  onBackgroundUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.certificateBackground = e.target?.result as string;
        this.certificateData.templateSettings.backgroundImage = this.certificateBackground;
      };
      reader.readAsDataURL(file);
    }
  }

  onSignatureUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.signatureImage = e.target?.result as string;
        const signatureElement = this.certificateData.templateSettings.elements.find(el => el.id === 'signature');
        if (signatureElement) {
          signatureElement.value = this.signatureImage;
          this.draggedElements.add('signature');
        }
      };
      reader.readAsDataURL(file);
    }
  }

  removeBackground(): void {
    this.certificateBackground = null;
    this.certificateData.templateSettings.backgroundImage = null;
  }

  removeSignature(): void {
    this.signatureImage = null;
    const signatureElement = this.certificateData.templateSettings.elements.find(el => el.id === 'signature');
    if (signatureElement) {
      signatureElement.value = null;
      this.draggedElements.delete('signature');
    }
  }

  // Drag and Drop Methods
  onDragStart(event: MouseEvent | TouchEvent, element: CertificateElement): void {
    if (!element.isDraggable) return;
    
    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
    
    this.activeElement = element;
    this.isDragging = true;
    
    const elementRect = (event.target as HTMLElement).getBoundingClientRect();
    this.dragOffset = {
      x: clientX - elementRect.left,
      y: clientY - elementRect.top
    };
    
    if (event instanceof MouseEvent) {
      event.preventDefault();
    }
  }

  onDragMove(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging || !this.activeElement) return;
    
    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const clientY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
    
    const previewElement = document.querySelector('.certificate-preview');
    if (previewElement) {
      const rect = previewElement.getBoundingClientRect();
      const x = clientX - rect.left - this.dragOffset.x;
      const y = clientY - rect.top - this.dragOffset.y;
      
      this.updateElementPosition(this.activeElement.id, x, y);
    }
    
    event.preventDefault();
  }

  onDragEnd(): void {
    this.isDragging = false;
    this.activeElement = null;
  }

  private updateElementPosition(elementId: string, x: number, y: number): void {
    const index = this.certificateData.templateSettings.elements.findIndex(
      el => el.id === elementId
    );
    
    if (index !== -1) {
      this.certificateData.templateSettings.elements[index].position = { x, y };
      this.draggedElements.add(elementId);
    }
  }

  // Touch Event Handlers
  onTouchStart(event: TouchEvent, element: CertificateElement): void {
    if (!element.isDraggable) return;
    const touch = event.touches[0];
    this.onDragStart(new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    }), element);
  }

  onTouchMove(event: TouchEvent): void {
    const touch = event.touches[0];
    this.onDragMove(new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    }));
  }

  onTouchEnd(): void {
    this.onDragEnd();
  }

  // Form Submission
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  }

  saveCertificate(): void {
    console.log('Certificate saved:', this.certificateData);
  }
}