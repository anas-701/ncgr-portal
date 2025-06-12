import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'field-validation',
    standalone: true,
    imports: [],
    template: `
    <div class="invalid-feedback">
  @if(control && control.invalid && (control.dirty || control.touched)){
        @if(control.errors?.['required']){
            هذا الحقل مطلوب
        }
        @if(control.errors?.['englishLetters']){
            يرجى إدخال حروف إنجليزية فقط
        }
        @if(control.errors?.['arabicLetters']){
            يرجى إدخال حروف عربية فقط
        }
        @if(control.errors?.['customEmail']){
            يجب إدخال بريد صالح
        }
        @if(control.errors?.['url']){
            يرجى إدخال رابط صالح
        }
        @if(control.errors?.['email']){
            Please enter a valid email
        }
        @if(control.errors?.['minlength']){
            Minimum length: {{ control.errors?.['minlength'].requiredLength }}
        }
        @if(control.errors?.['maxlength']){
            Maximum length: {{ control.errors?.['maxlength'].requiredLength }}
        }
        @if(control.errors?.['min']){
            Minimum value: {{ control.errors?.['min'].requiredLength }}
        }
        @if(control.errors?.['max']){
            Maximum value: {{ control.errors?.['max'].requiredLength }}
        }
        @if(control.errors?.['pattern']){
            Invalid format
        }
    }
</div>
  `
})
export class FieldValidationComponent {
    @Input() control?: AbstractControl | null;
}