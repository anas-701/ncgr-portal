import { Component, inject, OnInit, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedDynamicFormComponent } from '../../../../@shared/shared-dynamic-form/shared-dynamic-form.component';
import {  FormFieldConfig } from '../../../../@shared/shared-dynamic-form/interfaces/form-field-config.interface';
import { WorkshopEditorService } from '../services/workshop-editor.service';

@Component({
  selector: 'app-workshop-editor-step-two',
  imports: [
    ReactiveFormsModule,
    SharedDynamicFormComponent
  ],
  templateUrl: './workshop-editor-step-two.component.html',
  styleUrl: './workshop-editor-step-two.component.scss'
})
export class WorkshopEditorStepTwoComponent implements OnInit {
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
        key: 'type',
        type: 'radio',
        styleClass: 'col-md-6',
        label: 'نوع الورشة',
        validators: [Validators.required],
        options: [
          { label: 'خاص', value: '1' },
          { label: 'عام', value: '2' },
        ],
      },
      {
        key: 'category',
        type: 'select',
        styleClass: 'col-md-6',
        label: 'الفئة المستهدفة',
        validators: [Validators.required],
        options: [
          { label: 'خاص', value: '1' },
          { label: 'عام', value: '2' },
        ],
        conditionalVisibility: {
          dependsOn: 'type',
          condition: 'equals',
          value: '1',
        }
      },
      {
        type:'template',
        styleClass:'col-12'
      },
      {
        key: 'specialWorkshop',
        type: 'radio',
        styleClass: 'col-md-6',
        label: 'ورشة خاصة بالبرامج العامة',
        validators: [Validators.required],
        options: [
          { label: 'نعم', value: '1' },
          { label: 'لا', value: '2' },
        ],
      },
    ];
    setTimeout(() => {
      this.setFormData()
    }, 1000);
  }
  setFormData() {
      const existingData = {
        "type": "1",
        "specialWorkshop":'2'
    };

    this.form.patchValue(existingData);
  }
  back(){
    this.onChangeStep.emit(1)
  }
  onSubmit() {
    console.log('form', this.form.value)
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }
    this.onChangeStep.emit(3)
  }

}
