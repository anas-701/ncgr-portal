import { Component, OnInit } from '@angular/core';
import { ToasterService, ToastMessage } from '../toaster.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-toaster',
  imports: [CommonModule],
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements OnInit {
  toasts: ToastMessage[] = [];

  constructor(private toasterService: ToasterService) {}

  ngOnInit(): void {
    this.toasterService.toast$.subscribe(toast => {
      this.toasts.push(toast);
      setTimeout(() => this.removeToast(toast), toast.duration || 3000);
    });
  }

  removeToast(toast: ToastMessage) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
