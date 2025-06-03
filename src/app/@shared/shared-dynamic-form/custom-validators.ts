import { ValidationErrors } from "@angular/forms";

import { AbstractControl } from "@angular/forms";

export class CustomValidators {
  
    static arabicLetters(control: AbstractControl): ValidationErrors | null {
      return !control.value || /^[\u0621-\u064A\s\/p{N}\s0-9]+$/.test(control.value) 
        ? null 
        : { 'arabicLetters': true };
    }
  
    static englishLetters(control: AbstractControl): ValidationErrors | null {
      return !control.value || /^[~`!@#$%^&*()_+=[\]\\{}|;':",.\/<>?a-zA-Z\s0-9-]+$/.test(control.value) 
        ? null 
        : { 'englishLetters': true };
    }
  
    static customEmail(control: AbstractControl): ValidationErrors | null {
      return !control.value || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(control.value) 
        ? null 
        : { 'customEmail': true };
    }
    static url(control: AbstractControl): ValidationErrors | null {
      return !control.value || /^(ftp|http|https):\/\/[^ "]+$/.test(control.value)
        ? null 
        : { 'url': true };
    }
  
    // Additional useful validators
    static phoneNumber(control: AbstractControl): ValidationErrors | null {
      return !control.value || /^[+]?[\d\s\-()]{10,15}$/.test(control.value) 
        ? null 
        : { 'phoneNumber': true };
    }
  
    static nationalId(control: AbstractControl): ValidationErrors | null {
      return !control.value || /^\d{14}$/.test(control.value) 
        ? null 
        : { 'nationalId': true };
    }
  
    static minLength(length: number) {
      return (control: AbstractControl): ValidationErrors | null => {
        return !control.value || control.value.length >= length 
          ? null 
          : { 'minLength': { requiredLength: length, actualLength: control.value.length } };
      };
    }
  
    static maxLength(length: number) {
      return (control: AbstractControl): ValidationErrors | null => {
        return !control.value || control.value.length <= length 
          ? null 
          : { 'maxLength': { requiredLength: length, actualLength: control.value.length } };
      };
    }
  }