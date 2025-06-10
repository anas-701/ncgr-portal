import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedDynamicFormComponent } from '../../../../../@shared/shared-dynamic-form/shared-dynamic-form.component';
import { FormFieldConfig } from '../../../../../@shared/shared-dynamic-form/interfaces/form-field-config.interface';

@Component({
  selector: 'app-workshop-multi-choice-question-editor',
  imports: [
    ReactiveFormsModule,
    SharedDynamicFormComponent
  ],
  templateUrl: './workshop-multi-choice-question-editor.component.html',
  styleUrl: './workshop-multi-choice-question-editor.component.scss'
})
export class WorkshopMultiChoiceQuestionEditorComponent implements OnInit {

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
        key: 'skills',
        label: 'المهارات',
        type: 'array',
        styleClass: 'col-12 my-3 border p-3 rounded',
        arrayConfig: {
          addButtonText: 'اضف اختيار اخر',
          removeButtonClass: 'btn mt-4',
          itemClass: 'd-flex align-items-center mb-2',
          minItems: 1,
          fields: [
            {
              key: 'title',
              label: 'الأختيار',
              type: 'text',
              placeholder: 'ادخل نص الاختبار',
              styleClass: 'col-11',
              validators: [Validators.required]
            },
          ]
        }
      },
      {
        template: ' <div class="fw-500 mb-3 mt-3 border-bottom pb-3">الاجابة الصحيحة</div>'
      },
      {
        key: 'correct',
        type: 'select',
        styleClass: 'col-12',
        placeholder: 'اختر اي الخيارات يمثل الاجابة الصحيحة',
        validators: [Validators.required],
        options: []
      },
    ]
    console.log(this.form)

    this.setFormData()
  }


  ngAfterViewInit() {
    const skillsArray = this.form.get('skills') as FormArray;
    this.updateCorrectOptions(skillsArray);
    skillsArray.valueChanges.subscribe(() => {
      this.updateCorrectOptions(skillsArray);
    });
  }

  updateCorrectOptions(skillsArray: FormArray) {
    const options = skillsArray.controls.map((control, index) => ({
      label: control.get('title')?.value || `اختيار ${index + 1}`,
      value: index.toString()
    }));

    const correctField = this.formFields.find(f => f.key === 'correct');
    if (correctField) {
      correctField.options = options;
    }

    const correctControl = this.form.get('correct');
    if (correctControl && !options.find(opt => opt.value === correctControl.value)) {
      correctControl.setValue(null);
    }
  }


  setFormData() {
    const existingData = {
      "type": "1",
      "specificDate": "2"
    };
    setTimeout(() => {

      this.form.patchValue(existingData);
    }, 100);
  }
  onSubmit() {

  }

}
