// field-renderer.component.ts
import { Component, Input } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { FormFieldConfig } from './interfaces/form-field-config.interface';
import { DfDateFieldComponent } from './components/df-date-field/df-date-field.component';
import { DfEditorFieldComponent } from './components/df-editor-field/df-editor-field.component';
import { DfFileFieldComponent } from './components/df-file-field/df-file-field.component';
import { DfInputFieldComponent } from './components/df-input-field/df-input-field.component';
import { DfRadioFieldComponent } from './components/df-radio-field/df-radio-field.component';
import { DfSelectFieldComponent } from './components/df-select-field/df-select-field.component';
import { DfTimeFieldComponent } from './components/df-time-field/df-time-field.component';

@Component({
    selector: 'app-field-renderer',
    template: `
    @switch (field.type) {
      @case ('text') {
        <app-df-input-field 
          [id]="fieldId" 
          [label]="field.label!" 
          [class]="field.styleClass"
          [placeholder]="field.placeholder" 
          [control]="control" 
          [required]="isRequired"
          [formControlName]="field.key!">
        </app-df-input-field>
      }
      @case ('select') {
        <app-df-select-field 
          [id]="fieldId" 
          [label]="field.label!" 
          [class]="field.styleClass"
          [placeholder]="field.placeholder" 
          [control]="control" 
          [required]="isRequired"
          [formControlName]="field.key!" 
          [options]="field.options">
        </app-df-select-field>
      }
      @case ('editor') {
        <app-df-editor-field 
          [id]="fieldId" 
          [label]="field.label!" 
          [class]="field.styleClass"
          [placeholder]="field.placeholder" 
          [control]="control" 
          [required]="isRequired"
          [formControlName]="field.key!">
        </app-df-editor-field>
      }
      @case ('file') {
        <app-df-file-field 
          [id]="fieldId" 
          [label]="field.label!" 
          [class]="field.styleClass"
          [placeholder]="field.placeholder" 
          [control]="control" 
          [required]="isRequired"
          [formControlName]="field.key!">
        </app-df-file-field>
      }
      @case ('radio') {
        <app-df-radio-field 
          [id]="fieldId" 
          [label]="field.label!" 
          [class]="field.styleClass"
          [placeholder]="field.placeholder" 
          [control]="control" 
          [required]="isRequired"
          [formControlName]="field.key!" 
          [options]="field.options">
        </app-df-radio-field>
      }
      @case ('date') {
        <app-df-date-field 
          [id]="fieldId" 
          [label]="field.label!" 
          [class]="field.styleClass"
          [placeholder]="field.placeholder" 
          [control]="control" 
          [required]="isRequired"
          [formControlName]="field.key!" 
          [minDate]="field.minDate" 
          [maxDate]="field.maxDate"
          [dateFormat]="field.dateFormat">
        </app-df-date-field>
      }
      @case ('time') {
        <app-df-time-field 
          [id]="fieldId" 
          [label]="field.label!" 
          [class]="field.styleClass"
          [placeholder]="field.placeholder" 
          [control]="control" 
          [required]="isRequired"
          [formControlName]="field.key!" 
          [maxTime]="field.maxTime" 
          [minTime]="field.minTime" 
          [step]="field.step"
          [timeFormat]="field.timeFormat" 
          [showTimeFormat]="field.showTimeFormat">
        </app-df-time-field>
      }
      @default {
        <div [class]="field.styleClass" [innerHTML]="field.template"></div>
      }
    }
  `,
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
    standalone:true,
})
export class FieldRendererComponent {
    @Input() field!: FormFieldConfig;
    @Input() control!: AbstractControl | null;
    @Input() fieldId!: string;
    @Input() isRequired: boolean = false;
}