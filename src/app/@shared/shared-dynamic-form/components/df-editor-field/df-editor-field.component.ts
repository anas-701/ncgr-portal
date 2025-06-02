import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { FieldValidationComponent } from '../../field-validation.component';
import { NgClass } from '@angular/common';
import { BaseFieldComponent } from '../../base-field.component';

@Component({
  selector: 'app-df-editor-field',
  imports: [
    NgxEditorModule,
    ReactiveFormsModule,
    NgClass,
    FieldValidationComponent
  ],
  templateUrl: './df-editor-field.component.html',
  styleUrl: './df-editor-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DfEditorFieldComponent),
      multi: true
    },
  ],
})
export class DfEditorFieldComponent extends BaseFieldComponent implements OnInit,OnDestroy{
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  get formControl(): FormControl {
    return this.control as FormControl;
  }
  ngOnInit(): void {
    this.editor = new Editor();
  }
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.updateValue(target.value);
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  } 
}
