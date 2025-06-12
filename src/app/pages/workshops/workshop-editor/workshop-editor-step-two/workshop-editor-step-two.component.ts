import { Component, DestroyRef, effect, inject, OnInit, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedDynamicFormComponent } from '../../../../@shared/shared-dynamic-form/shared-dynamic-form.component';
import { FormFieldConfig } from '../../../../@shared/shared-dynamic-form/interfaces/form-field-config.interface';
import { WorkshopEditorService } from '../services/workshop-editor.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest } from 'rxjs';
import { AppLookUpServiceService } from '../../../../@core/services/app-look-up-service.service';

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
  _workshopEditorService = inject(WorkshopEditorService);
  _appLookUpService=inject(AppLookUpServiceService);
  _destroyRef=inject(DestroyRef)
  lookupData:any


  ngOnInit(): void {
    this.getLookupData()
  }
  getLookupData() {
    combineLatest({
      category: this._appLookUpService.getAllCategories()
    }).pipe(takeUntilDestroyed(this._destroyRef)).subscribe((res) => {
      this.lookupData = res;
      this.initForm()
    });
  }
  initForm() {
    this.formFields = [
      {
        key: 'typeId',
        type: 'radio',
        styleClass: 'col-md-6',
        label: 'نوع الورشة',
        options: [
          { label: 'خاص', value: 1 },
          { label: 'عام', value: 2 },
        ],
      },
      {
        key: 'categoryId',
        type: 'select',
        styleClass: 'col-md-6',
        label: 'الفئة المستهدفة',
        validators: [Validators.required],
        options: [],
        conditionalVisibility: {
          dependsOn: 'typeId',
          condition: 'equals',
          value: 1,
        }
      },
      {
        type: 'template',
        styleClass: 'col-12'
      },
      {
        key: 'privateProgram',
        type: 'radio',
        styleClass: 'col-md-6',
        label: 'ورشة خاصة بالبرامج العامة',
        options: [
          { label: 'نعم', value: true },
          { label: 'لا', value: false },
        ],
      },
    ];
    this.updateCategoryOptions()
    setTimeout(() => {
      this.setDefaultFormValue();
      this.setFormData()
    },500);
  }
 
  setDefaultFormValue() {
    const defaultValue = {
      typeId: 1,
      privateProgram: false
    }
    this.form.patchValue(defaultValue);
  }
  setFormData() {
    this.form.patchValue(this._workshopEditorService.getWorkShop());
  }
  updateCategoryOptions(){
    const options =this.lookupData.category.result.map((obj: any) => ({ label: obj.name, value: obj.id }))
    const categoryField = this.formFields.find(obj=>obj.key==='categoryId');
    if(categoryField){
      categoryField.options=options
    }
  }
  back() {
    this.onChangeStep.emit(1)
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
    this.onChangeStep.emit(3)
  }

}
