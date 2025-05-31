import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppLookUpResponse } from '../../@models/app-lookup-response.model';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-shared-card',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './shared-card.component.html',
  styleUrl: './shared-card.component.scss',
})
export class SharedCardComponent {
  @Input() title: string = '';
  @Input() id: any;
  @Input() creator: string = '';
  @Input() createdDate: string = '';
  @Input() approver: string = '';
  @Input() approvedDate: string = '';
  @Input() category?: string = '';
  @Input() participants: number = 0;
  @Input() rating: string = '';
  @Input() selectedStatus: any = '';
  @Input() postDate: string = '';
  @Input() picture: string = '';
  @Input() statusOptions: AppLookUpResponse[] = [];
  @Input() language: number = 1;
  @Input() tagName: any = '';
  @Input() postType: string = '';
  constructor(private router: Router) {}

  edit() {
    this.router.navigate(['/add-training-program'], {
      queryParams: { id: this.id },
    });
  }

  navigateToTrainingContent() {
    this.router.navigate(['/training-content'], {
      queryParams: { id: this.id, title: this.title },
    });
  }
  onStatusChange(event: any) {
    const selectedStatus = event.target.value;
    this.selectedStatus = this.statusOptions.find(
      (status) => status.id === Number(selectedStatus)
    )?.name;
    console.log(this.statusOptions);
    console.log(this.selectedStatus);
  }
}
