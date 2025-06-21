import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastMessage {
  text: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private toastSubject = new Subject<ToastMessage>();
  toast$ = this.toastSubject.asObservable();

  show(message: ToastMessage) {
    this.toastSubject.next(message);
  }

  success(text: string, duration = 3000) {
    this.show({ text, type: 'success', duration });
  }

  error(text: string, duration = 3000) {
    this.show({ text, type: 'error', duration });
  }

  info(text: string, duration = 3000) {
    this.show({ text, type: 'info', duration });
  }

  warning(text: string, duration = 3000) {
    this.show({ text, type: 'warning', duration });
  }
}
