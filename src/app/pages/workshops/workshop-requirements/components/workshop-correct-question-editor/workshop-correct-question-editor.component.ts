import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedDynamicFormComponent } from '../../../../../@shared/shared-dynamic-form/shared-dynamic-form.component';
import { CustomValidators } from '../../../../../@shared/shared-dynamic-form/custom-validators';
import { FormFieldConfig } from '../../../../../@shared/shared-dynamic-form/interfaces/form-field-config.interface';

@Component({
  selector: 'app-workshop-correct-question-editor',
  imports: [
    ReactiveFormsModule,
    SharedDynamicFormComponent
  ],
  templateUrl: './workshop-correct-question-editor.component.html',
  styleUrl: './workshop-correct-question-editor.component.scss'
})
export class WorkshopCorrectQuestionEditorComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  formFields: FormFieldConfig[] = [];
  ngOnInit(): void {
    this.initForm()
  }
  initForm() {
    this.formFields = [
      {
        key: 'qustion',
        type: 'text',
        styleClass: 'col-12',
        label: 'نص السؤال',
        validators: [Validators.required],
      },
      {
        key: 'degree',
        type: 'text',
        styleClass: 'col-12',
        label: 'درجة السؤال',
        validators: [Validators.required],
      },
      {
        template: ' <div class="fw-500 mb-3 mt-3 border-bottom pb-3">الاختيارات</div>'
      },
      {
        key: 'correct',
        type: 'text',
        styleClass: 'col-12',
        label: 'الأختيار (صواب)',
        validators: [Validators.required],
      },
      {
        key: 'wrong',
        type: 'text',
        styleClass: 'col-12',
        label: 'الأختيار (خطأ)',
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
