import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormFieldConfig } from './interfaces/form-field-config.interface';
import { DfInputFieldComponent } from './components/df-input-field/df-input-field.component';
import { DfSelectFieldComponent } from './components/df-select-field/df-select-field.component';
import { DfEditorFieldComponent } from './components/df-editor-field/df-editor-field.component';
import { DfFileFieldComponent } from './components/df-file-field/df-file-field.component';
import { DfRadioFieldComponent } from './components/df-radio-field/df-radio-field.component';

@Component({
  selector: 'app-shared-dynamic-form',
  imports: [
    ReactiveFormsModule,
    DfInputFieldComponent,
    DfSelectFieldComponent,
    DfEditorFieldComponent,
    DfFileFieldComponent,
    DfRadioFieldComponent
  ],
  templateUrl: './shared-dynamic-form.component.html',
  styleUrl: './shared-dynamic-form.component.scss'
})
export class SharedDynamicFormComponent implements OnInit{
  @Input() fields: FormFieldConfig[] = [];
  @Input() form!: FormGroup;
  @Input() parentStyleClass!: string;

  ngOnInit() {
    this.addControlsToParentForm();
    this.setupConditionalVisibility();
  }

  private addControlsToParentForm() {
    this.fields.forEach(field => {
      const validators = field.validators || [];
      this.form.addControl(field.key, this.fb.control('', validators));
    });
  }

  private setupConditionalVisibility() {
    // Subscribe to form value changes to handle conditional visibility
    this.form.valueChanges.subscribe(() => {
      this.updateFieldVisibility();
    });
  }

  private updateFieldVisibility() {
    this.fields.forEach(field => {
      if (field.conditionalVisibility) {
        const shouldShow = this.shouldShowField(field);
        const control = this.form.get(field.key);
        
        if (!shouldShow && control) {
          // Clear the value and disable the control when hidden
          control.setValue('');
          control.disable();
        } else if (shouldShow && control) {
          // Enable the control when shown
          control.enable();
        }
      }
    });
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
        return dependentValue === condition.value;
      case 'notEquals':
        return dependentValue !== condition.value;
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

  private fb = new FormBuilder();
}
