import { Component, inject, OnInit, output } from '@angular/core';
import { FormFieldConfig } from '../../../@shared/shared-dynamic-form/interfaces/form-field-config.interface';
import { CustomValidators } from '../../../@shared/shared-dynamic-form/custom-validators';
import { SharedDynamicFormComponent } from '../../../@shared/shared-dynamic-form/shared-dynamic-form.component';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SideBarComponent } from '../../side-bar/side-bar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CertificateElement, mockCertificateData } from './certificate-fields.mock';

@Component({
  selector: 'app-certificates-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    SharedDynamicFormComponent, 
    SideBarComponent,
    CommonModule
  ],
  templateUrl: './certificates-editor.component.html',
  styleUrls: ['./certificates-editor.component.scss']
})
export class CertificatesEditorComponent implements OnInit {
 _route = inject(ActivatedRoute);
  _router = inject(Router);

  form: FormGroup = new FormGroup({});
  onChangeStep = output<number>();
  formFields: FormFieldConfig[] = [];
  certificateData = mockCertificateData;
  certificateBackground: string | null = null;
  signatureImage: string | null = null;
  draggedItem: CertificateElement | null = null;
  draggedElements: Set<string> = new Set();
  dragOverTrash = false;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.formFields = [
      {
        key: 'title',
        type: 'text',
        label: 'اسم القالب (بالعربية)',
        styleClass: 'col-md-6',
        validators: [Validators.required, CustomValidators.arabicLetters],
      },
      {
        key: 'titleEn',
        type: 'text',
        label: 'اسم القالب (بالانجليزية)',
        styleClass: 'col-md-6 mb-2',
        validators: [Validators.required, CustomValidators.englishLetters],
      },
      {
        key: 'role',
        type: 'select',
        label: 'مخصص لـ',
        styleClass: 'col-md-4 mb-2',
        validators: [Validators.required],
        options: [
          { label: 'الورش التتدريبية', value: '1' },
          { label: 'البرامج العامة', value: '2' },
        ],
      },
      {
        key: 'approve',
        type: 'radio',
        styleClass: 'col-md-4 mb-2',
        label: 'يتطلب موافقة',
        options: [
          { label: 'نعم', value: '1' },
          { label: 'لا', value: '2' },
        ],
      },
      {
        key: 'roles',
        type: 'select',
        label: 'المسؤل عن الموافقة',
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
        styleClass: 'col-md-3 mb-2',
        label: 'صلاحية الشهادة',
        options: [
          { label: 'محدده بمدة', value: '1' },
          { label: 'دائمة', value: '2' },
        ],
      },
      {
        key: 'time',
        type: 'select',
        label: 'حدد المدة',
        styleClass: 'col-md-4 mb-2',
        validators: [Validators.required],
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
        label: '   ',
        styleClass: 'col-md-5 mb-2',
        validators: [Validators.required, CustomValidators.englishLetters],
        conditionalVisibility: {
          dependsOn: 'time',
          condition: 'equals',
          value: '1',
        }
      },
    ];
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.onChangeStep.emit(2);
  }

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

  onDragStart(event: DragEvent, element: CertificateElement): void {
    this.draggedItem = element;
    event.dataTransfer?.setData('text/plain', element.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (this.draggedItem) {
      const previewElement = document.querySelector('.certificate-preview');
      if (previewElement) {
        const rect = previewElement.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const index = this.certificateData.templateSettings.elements.findIndex(
          el => el.id === this.draggedItem?.id
        );
        
        if (index !== -1) {
          this.certificateData.templateSettings.elements[index].position = { x, y };
          this.draggedElements.add(this.draggedItem.id);
        }
      }
    }
  }

  onTrashDragEnter(event: DragEvent): void {
    event.preventDefault();
    this.dragOverTrash = true;
  }

  onTrashDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragOverTrash = false;
  }

  onTrashDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragOverTrash = false;
    
    if (this.draggedItem) {
        const index = this.certificateData.templateSettings.elements.findIndex(
            el => el.id === this.draggedItem?.id
        );
        
        if (index !== -1) {
            this.resetElementPosition(index);
            this.draggedElements.delete(this.draggedItem.id);
            
            if (this.certificateData.templateSettings.elements[index].type === 'image') {
                this.certificateData.templateSettings.elements[index].value = null;
            }
        }
    }
  }

  private resetElementPosition(index: number): void {
    this.certificateData.templateSettings.elements[index].position = { 
        x: 100, 
        y: 100 + (index * 40) 
    };
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  saveCertificate(): void {
    console.log('بيانات الشهادة المحفوظة:', this.certificateData);
  }
}