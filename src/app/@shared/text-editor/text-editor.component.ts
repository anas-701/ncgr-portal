import {
  NgxEditorMenuComponent,
  Editor,
  Toolbar,
  NgxEditorModule,
} from 'ngx-editor';
import { FormsModule } from '@angular/forms';
import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { setBlockType } from 'prosemirror-commands';
import { schema } from 'ngx-editor';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'app-editor',
  templateUrl: 'text-editor.component.html',
  styleUrls: ['text-editor.component.scss'],
  standalone: true,
  imports: [
    NgxEditorMenuComponent,
    FormsModule,
    CommonModule,
    NgxEditorModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextEditor),
      multi: true,
    },
  ],
})
export class TextEditor implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() rows: number = 6;
  editor!: Editor;
  toolbar: Toolbar = [
    ['underline', 'italic', 'bold'],
    ['align_justify', 'align_right', 'align_center', 'align_left'],
  ];

  value: string = '';
  disabled = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(value: string): void {
    this.value = value;
    this.onChange(value);
  }
  ngOnInit(): void {
    this.editor = new Editor();
  }
  setHeading(level: number) {
    const command = setBlockType(schema.nodes.heading, { level });
    command(this.editor.view.state, this.editor.view.dispatch);
    this.editor.view.focus();
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
