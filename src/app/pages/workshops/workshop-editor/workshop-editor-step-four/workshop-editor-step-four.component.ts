import { Component, inject, OnInit, output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { FormFieldConfig } from '../../../../@shared/shared-dynamic-form/interfaces/form-field-config.interface';
import { SharedDynamicFormComponent } from '../../../../@shared/shared-dynamic-form/shared-dynamic-form.component';
import { WorkshopEditorService } from '../services/workshop-editor.service';

@Component({
  selector: 'app-workshop-editor-step-four',
  imports: [
    ReactiveFormsModule,
    SharedDynamicFormComponent
  ],
  templateUrl: './workshop-editor-step-four.component.html',
  styleUrl: './workshop-editor-step-four.component.scss'
})
export class WorkshopEditorStepFourComponent  implements OnInit {
  form: FormGroup = new FormGroup({});
  onChangeStep = output<number>();
  formFields: FormFieldConfig[] = [];
  _workshopEditorService = inject(WorkshopEditorService)
  // signalEffect = effect(() => {
  //   if (this._workshopEditorService.getMatterDetails()) {
  //     this.setFormValue()
  //   }
  // })
  ngOnInit(): void {
    this.initForm()
  }
  initForm() {
    this.formFields = [
      {
        key: 'cost',
        type: 'radio',
        styleClass: 'col-md-6',
        label: 'تكلفة الورشة',
        validators: [Validators.required],
        options: [
          { label: 'مجاني', value: '1' },
          { label: 'مدفوع', value: '2' },
        ],
      },
      {
        key: 'fees',
        type: 'text',
        styleClass: 'col-md-6',
        label: 'الرسوم',
        validators: [Validators.required],
        conditionalVisibility: {
          dependsOn: 'cost',
          condition: 'equals',
          value: '2',
        }
      },
      {
        key: 'certificate',
        type: 'select',
        styleClass: 'col-12',
        label: 'قالب الشهادة',
        validators: [Validators.required],
        options: [
          { label: 'خاص', value: '1' },
          { label: 'عام', value: '2' },
        ]
      },
    ];
    setTimeout(() => {
      this.setFormData()
    }, 1000);
  }
  setFormData() {
      const existingData = {
        "type": "1",
    };

    this.form.patchValue(existingData);
  }
  back(){
    this.onChangeStep.emit(2)
  }
  onSubmit() {
    console.log('form', this.form.value)
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }

  }




}
