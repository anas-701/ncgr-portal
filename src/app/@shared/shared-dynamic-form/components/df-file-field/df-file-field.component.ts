import { Component, forwardRef } from '@angular/core';
import { BaseFieldComponent } from '../../base-field.component';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FieldValidationComponent } from '../../field-validation.component';

@Component({
  selector: 'app-df-file-field',
  imports: [
    ReactiveFormsModule,
    FieldValidationComponent
  ],
  templateUrl: './df-file-field.component.html',
  styleUrl: './df-file-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DfFileFieldComponent),
      multi: true
    }
  ],
})
export class DfFileFieldComponent extends BaseFieldComponent{
  removeImage(){
    this.control?.setValue(null)
  }
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        alert('يرجى اختيار ملف من نوع JPEG أو JPG أو PNG فقط');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('حجم الملف يجب أن لا يتجاوز 5 ميجابايت');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.control?.patchValue(e.target.result)
      };
      reader.readAsDataURL(file);
    }
  }
}
