import { Component, DestroyRef, inject, OnInit, output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { FormFieldConfig } from '../../../../@shared/shared-dynamic-form/interfaces/form-field-config.interface';
import { SharedDynamicFormComponent } from '../../../../@shared/shared-dynamic-form/shared-dynamic-form.component';
import { WorkshopEditorService } from '../services/workshop-editor.service';
import { Router } from '@angular/router';
import { AppLookUpServiceService } from '../../../../@core/services/app-look-up-service.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, finalize } from 'rxjs';
import { WorkshopService } from '../../services/workshop.service';

@Component({
  selector: 'app-workshop-editor-step-four',
  imports: [
    ReactiveFormsModule,
    SharedDynamicFormComponent
  ],
  templateUrl: './workshop-editor-step-four.component.html',
  styleUrl: './workshop-editor-step-four.component.scss'
})
export class WorkshopEditorStepFourComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  onChangeStep = output<number>();
  formFields: FormFieldConfig[] = [];
  _workshopEditorService = inject(WorkshopEditorService);
  _workshopService = inject(WorkshopService)
  _appLookUpService = inject(AppLookUpServiceService)
  _router = inject(Router);
  _destroyRef = inject(DestroyRef)
  lookupData: any;
  isLoading!:boolean
  ngOnInit(): void {
    this.getLookupData()
  }
  getLookupData() {
    combineLatest({
      certificate: this._appLookUpService.getAllCertificates()
    }).pipe(takeUntilDestroyed(this._destroyRef)).subscribe((res) => {
      this.lookupData = res;
      this.initForm()
    });
  }
  initForm() {
    this.formFields = [
      {
        key: 'programCostId',
        type: 'radio',
        styleClass: 'col-md-6',
        label: 'تكلفة الورشة',
        options: [
          { label: 'مجاني', value: 1 },
          { label: 'مدفوع', value: 2 },
        ],
      },
      {
        key: 'amount',
        type: 'text',
        styleClass: 'col-md-6',
        label: 'الرسوم',
        validators: [Validators.required],
        conditionalVisibility: {
          dependsOn: 'programCostId',
          condition: 'equals',
          value: 2,
        }
      },
      {
        key: 'certificateId',
        type: 'select',
        styleClass: 'col-12',
        label: 'قالب الشهادة',
        validators: [Validators.required],
        options: []
      },
    ];
    this.updateCertificateOptions();
    setTimeout(() => {
      this.setDefaultFormValue();
      this.setFormData()
    }, 500);
  }

  updateCertificateOptions() {
    const options = this.lookupData.certificate.result.map((obj: any) => ({ label: obj.name, value: obj.id }))
    const certificateField = this.formFields.find(field => field.key === 'certificateId')
    if (certificateField) {
      certificateField.options = options
    }

  }


  setDefaultFormValue() {
    const defaultValue = {
      programCostId: 1
    }
    this.form.patchValue(defaultValue);
  }
  setFormData() {
    this.form.patchValue(this._workshopEditorService.getWorkShop());
  }
  back() {
    this.onChangeStep.emit(3)
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
    const formvalue = this._workshopEditorService.getWorkShop()
    const formData: FormData = new FormData();
    for (const key in formvalue) {
      if (formvalue[key] === null || formvalue[key] === undefined) continue;
      if(key==='workshopPicture') formData.append(key, formvalue[key])
      formData.append(key, formvalue[key].toString());
    }
    const apiPath$ = this._router.url.includes('create') ?
      this._workshopService.createWorkshop(formData) :
      this._workshopService.updateWorkshop(formData)
      this.isLoading=true
    apiPath$.pipe(
      finalize(()=>this.isLoading=false),
      takeUntilDestroyed(this._destroyRef)
    ).subscribe({
      next: (res: any) => {
        this._router.navigate(['/workshops'])
      }
    })
  }

}
