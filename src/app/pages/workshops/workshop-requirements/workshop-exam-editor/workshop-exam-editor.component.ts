import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '../../../../@shared/shared-dynamic-form/custom-validators';
import { FormFieldConfig } from '../../../../@shared/shared-dynamic-form/interfaces/form-field-config.interface';
import { SharedDynamicFormComponent } from '../../../../@shared/shared-dynamic-form/shared-dynamic-form.component';


@Component({
  selector: 'app-workshop-exam-editor',
  imports: [
    ReactiveFormsModule,
    SharedDynamicFormComponent
  ],
  templateUrl: './workshop-exam-editor.component.html',
  styleUrl: './workshop-exam-editor.component.scss'
})
export class WorkshopExamEditorComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  formFields: FormFieldConfig[] = [];
  ngOnInit(): void {
    this.initForm()
  }
  initForm() {
    this.formFields = [
      {
        key: 'title',
        type: 'text',
        styleClass: 'col-12',
        label: 'عنوان الاختبار (بالعربية)',
        validators: [Validators.required, CustomValidators.arabicLetters],
      },
      {
        key: 'titleEn',
        type: 'text',
        styleClass: 'col-12',
        label: 'عنوان الاختبار (بالانجليزية)',
        validators: [Validators.required, CustomValidators.englishLetters],
      },
      {
        template: ' <div class="fw-500 mb-3 mt-3 border-bottom pb-3">نوع الاختبار</div>'
      },

      {
        key: 'type',
        type: 'radio',
        styleClass: 'col-md-4 align-self-center',
        options: [
          { label: 'الكتروني', value: '1' },
          { label: 'حضوري', value: '2' },
        ],
      },
      {
        key: 'total',
        type: 'text',
        styleClass: 'col-md-4',
        label: 'مجموع الدرجات',
        validators: [Validators.required],
      },
      {
        key: 'success',
        type: 'text',
        styleClass: 'col-md-4',
        label: 'درجة النجاح',
        validators: [Validators.required],
      },
      {
        key: 'location',
        type: 'text',
        styleClass: 'col-12',
        label: 'مكان الاختبار (في حال الاختبار الحضوري)',
        validators: [Validators.required],
        conditionalVisibility: {
          dependsOn: 'type',
          condition: 'equals',
          value: '2',
        }
      },
      {
        template: ' <div class="fw-500 mb-3 mt-3 border-bottom pb-3">هل الاختبار محدد بموعد؟</div>'
      },
      {
        key: 'specificDate',
        type: 'radio',
        styleClass: 'col-md-4 align-self-center',
        options: [
          { label: 'نعم', value: '1' },
          { label: 'لا', value: '2' },
        ],
      },
      {
        key: 'date',
        type: 'date',
        styleClass: 'col-md-4',
        label: 'تاريخ الاختبار',
        validators: [Validators.required],
        conditionalVisibility: {
          dependsOn: 'specificDate',
          condition: 'equals',
          value: '1',
        }
      },
     
      {
        key: 'time',
        type: 'time',
        styleClass: 'col-md-4',
        label: 'وقت الاختبار',
        validators: [Validators.required],
        conditionalVisibility: {
          dependsOn: 'specificDate',
          condition: 'equals',
          value: '1',
        }
      },
      {
        template: ' <div class="fw-500 mb-3 mt-3 border-bottom pb-3">مدة الاختبار (بالدقائق) في حال الاختبار اختبار الحضوري</div>'
      },
      {
        key: 'duration',
        type: 'text',
        styleClass: 'col-12',
        validators: [Validators.required],
      },
     
    ]
    this.setFormData()
  }
  setFormData() {
    const existingData = {
      "type": "1",
      "specificDate":"2"
    };
    setTimeout(() => {

      this.form.patchValue(existingData);
    }, 100);
  }
  onSubmit() {

  }
}
