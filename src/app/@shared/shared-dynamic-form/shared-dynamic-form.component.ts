import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormFieldConfig } from './interfaces/form-field-config.interface';
import { DfInputFieldComponent } from './components/df-input-field/df-input-field.component';
import { DfSelectFieldComponent } from './components/df-select-field/df-select-field.component';
import { DfEditorFieldComponent } from './components/df-editor-field/df-editor-field.component';
import { DfFileFieldComponent } from './components/df-file-field/df-file-field.component';
import { DfRadioFieldComponent } from './components/df-radio-field/df-radio-field.component';
import { DfDateFieldComponent } from './components/df-date-field/df-date-field.component';
import { DfTimeFieldComponent } from './components/df-time-field/df-time-field.component';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';


@Component({
  selector: 'app-shared-dynamic-form',
  imports: [
    ReactiveFormsModule,
    DfInputFieldComponent,
    DfSelectFieldComponent,
    DfEditorFieldComponent,
    DfFileFieldComponent,
    DfRadioFieldComponent,
    DfDateFieldComponent,
    DfTimeFieldComponent
  ],
  templateUrl: './shared-dynamic-form.component.html',
  styleUrl: './shared-dynamic-form.component.scss'
})
export class SharedDynamicFormComponent implements OnInit {
  @Input() fields: FormFieldConfig[] = [];
  @Input() form!: FormGroup;
  @Input() parentStyleClass!: string;
  private subscription: Subscription = new Subscription();
  private isUpdatingVisibility = false; // Flag to prevent infinite loops
  ngOnInit() {
    this.addControlsToParentForm();
    this.setupConditionalVisibility();
  }
  private addControlsToParentForm() {
    this.fields.forEach(field => {
      if (!field.key) return;

      if (field.type === 'array' && field.arrayConfig) {
        const formArray = this.fb.array([]);

        const minItems = field.arrayConfig.minItems || 0;
        for (let i = 0; i < minItems; i++) {
          const group: any = this.fb.group({});
          field.arrayConfig.fields.forEach(subField => {
            group.addControl(
              subField.key!,
              this.fb.control('', subField.validators || [])
            );
          });
          formArray.push(group);
        }

        this.form.addControl(field.key!, formArray);
      } else {
        const validators = field.validators || [];
        const initialValue = field.defaultValue ?? '';
        this.form.addControl(field.key!, this.fb.control(initialValue, validators));
      }
    });
  }

  private setupConditionalVisibility() {
    // Subscribe to form value changes with debounce and distinctUntilChanged
    const formSubscription = this.form.valueChanges.pipe(
      debounceTime(10), // Small debounce to prevent rapid fire
      distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
    ).subscribe(() => {
      if (!this.isUpdatingVisibility) {
        this.updateFieldVisibility();
      }
    });

    this.subscription.add(formSubscription);

    // Initial visibility check
    setTimeout(() => {
      this.updateFieldVisibility();
    }, 0);
  }

  private updateFieldVisibility() {
    this.isUpdatingVisibility = true;

    this.fields.forEach(field => {
      if (field.conditionalVisibility) {
        const shouldShow = this.shouldShowField(field);
        const control = this.form.get(field.key!);

        if (!shouldShow && control) {
          // Clear the value and disable the control when hidden
          if (control.value !== '' || control.enabled) {
            control.setValue('', { emitEvent: false }); // Don't emit event to prevent loop
            control.disable({ emitEvent: false });
          }
        } else if (shouldShow && control) {
          // Enable the control when shown
          if (control.disabled) {
            control.enable({ emitEvent: false });
          }
        }
      }
    });

    this.isUpdatingVisibility = false;
  }

  shouldShowField(field: FormFieldConfig): boolean {
    if (!field.conditionalVisibility) {
      return true; // Show field if no conditional visibility is defined
    }

    const condition = field.conditionalVisibility;
    const dependentControl = this.form.get(condition.dependsOn);

    if (!dependentControl) {
      return false; // Hide field if dependent control doesn't exist
    }

    const dependentValue = dependentControl.value;

    switch (condition.condition) {
      case 'equals':
        return dependentValue == condition.value;
      case 'notEquals':
        return dependentValue != condition.value;
      case 'contains':
        return dependentValue && dependentValue.toString().includes(condition.value);
      case 'greaterThan':
        return Number(dependentValue) > Number(condition.value);
      case 'lessThan':
        return Number(dependentValue) < Number(condition.value);
      default:
        return true;
    }
  }

  isRequired(field: FormFieldConfig): boolean {
    return field.validators?.some(validator => validator === Validators.required) || false;
  }
  // Form Array Methods
  getFormArray(fieldKey: string): FormArray {
    return this.form.get(fieldKey) as FormArray;
  }

  addArrayItem(arrayKey: string, arrayFields: any[]): void {
    const control = this.form.get(arrayKey);
    if (control instanceof FormArray) {
      const formArray = control as FormArray;
      const itemGroup = this.fb.group({});
      arrayFields.forEach(field => {
        itemGroup.addControl(
          field.key,
          this.fb.control(field.defaultValue || null, field.validators || [])
        );
      });
      formArray.push(itemGroup);
    }
  }

  removeArrayItem(fieldKey: string, index: number) {
    const formArray = this.getFormArray(fieldKey);
    if (formArray.length > 0) {
      formArray.removeAt(index);
    }
  }
  private fb = new FormBuilder();
}
