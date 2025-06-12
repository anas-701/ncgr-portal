import { Component, effect, inject, OnInit, output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { FormFieldConfig } from '../../../../@shared/shared-dynamic-form/interfaces/form-field-config.interface';
import { SharedDynamicFormComponent } from '../../../../@shared/shared-dynamic-form/shared-dynamic-form.component';
import { WorkshopEditorService } from '../services/workshop-editor.service';
import { CustomValidators } from '../../../../@shared/shared-dynamic-form/custom-validators';

@Component({
  selector: 'app-workshop-editor-step-three',
  imports: [
    ReactiveFormsModule,
    SharedDynamicFormComponent
  ],
  templateUrl: './workshop-editor-step-three.component.html',
  styleUrl: './workshop-editor-step-three.component.scss'
})
export class WorkshopEditorStepThreeComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  onChangeStep = output<number>();
  formFields: FormFieldConfig[] = [];
  _workshopEditorService = inject(WorkshopEditorService)
  // signalEffect = effect(() => {
  //   if (this._workshopEditorService.getWorkShop()) {
  //     console.log(this._workshopEditorService.getWorkShop())
  //     this.setFormData()
  //   }
  // })
  ngOnInit(): void {
    this.initForm()
  }
  initForm() {
    this.formFields = [
      {
        key: 'startDate',
        type: 'date',
        styleClass: 'col-md-6',
        label: 'تاريخ بدء الورشة',
        validators: [Validators.required],
      },
      {
        key: 'endDate',
        type: 'date',
        styleClass: 'col-md-6',
        label: 'تاريخ نهاية الورشة',
        validators: [Validators.required],
      },

      {
        key: 'startTime',
        type: 'time',
        styleClass: 'col-md-6',
        label: 'وقت البدء',
        validators: [Validators.required],
      },
      {
        key: 'endTime',
        type: 'time',
        styleClass: 'col-md-6',
        label: 'وقت الانتهاء',
        validators: [Validators.required],
      },
      {
        key: 'startDateRegister',
        type: 'date',
        styleClass: 'col-md-6',
        label: 'موعد بدء التسجيل',
        validators: [Validators.required],
      },
      {
        key: 'endDateRegister',
        type: 'date',
        styleClass: 'col-md-6',
        label: 'موعد انتهاء التسجيل',
        validators: [Validators.required],
      },
      {
        key: 'trainerTypeId',
        type: 'radio',
        styleClass: 'col-md-3',
        label: 'نوع التدريب',
        options: [
          { label: 'حضوري', value: 1 },
          { label: 'عن بعد', value: 2 },
        ],
      },
      {
        key: 'cityNameAr',
        type: 'text',
        label: 'اسم المدينة (بالعربية)',
        styleClass: 'col-md-3',
        validators: [CustomValidators.arabicLetters],
        conditionalVisibility: {
          dependsOn: 'trainerTypeId',
          condition: 'equals',
          value: 1,
        }
      },
      {
        key: 'cityNameEn',
        type: 'text',
        label: 'اسم المدينة (بالانجليزية)',
        styleClass: 'col-md-3',
        validators: [CustomValidators.englishLetters],
        conditionalVisibility: {
          dependsOn: 'trainerTypeId',
          condition: 'equals',
          value: '1',
        }
      },
      {
        key: 'workShopLink',
        type: 'text',
        label: 'رابط موقع الورشة',
        styleClass: 'col-md-3',
        validators: [CustomValidators.url],
        conditionalVisibility: {
          dependsOn: 'trainerTypeId',
          condition: 'equals',
          value: 1,
        }
      },
      {
        styleClass: 'col-12',
        type: 'template'
      },
      {
        key: 'meetingLinkTypeId',
        type: 'radio',
        styleClass: 'col-md-6',
        label: 'إنشاء رابط الاجتماع',
        options: [
          { label: 'يدويًا', value: 1 },
          { label: 'تلقائيًا', value: 2 },
        ],
        conditionalVisibility: {
          dependsOn: 'trainerTypeId',
          condition: 'equals',
          value: 2,
        }
      },
      {
        key: 'meetingLink',
        type: 'text',
        label: 'رابط الاجتماع',
        styleClass: 'col-md-6',
        validators: [CustomValidators.url],
        conditionalVisibility: {
          dependsOn: 'meetingLinkTypeId',
          condition: 'equals',
          value: 1,
        }
      },
      {
        key: 'numberOfSeats',
        type: 'text',
        label: 'عدد المقاعد',
        styleClass: 'col-12',
      },
    ];
    setTimeout(() => {
      this.setDefaultFormValue();
      this.setFormData()
    });
  }

  setDefaultFormValue() {
    const defaultValue = {
      trainerTypeId: 1,
      meetingLinkTypeId:1
    }
    this.form.patchValue(defaultValue);
  }
  setFormData() {
    this.form.patchValue(this._workshopEditorService.getWorkShop());
    console.log(this.form.value)
  }
  back() {
    this.onChangeStep.emit(2)
  }
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }
    this._workshopEditorService.updateWorkShop({
      ...this._workshopEditorService.getWorkShop(),
      ...this.form.value
    })
    this.onChangeStep.emit(4)
  }


}
