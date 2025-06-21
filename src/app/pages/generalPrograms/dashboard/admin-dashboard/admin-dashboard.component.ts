import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss','../../../../pages/training-content/component/course-accordion/component/delete-section-modal/delete-section-modal.component.scss'],
})
export class AdminDashboardComponent {
  @Input() program: any = {};
  @Input() statusOptions: any[] = [];

  @Output() viewDetails = new EventEmitter<number>();
  @Output() editProgram = new EventEmitter<number>();
  @Output() deleteProgram = new EventEmitter<number>();
  @Output() viewTrainees = new EventEmitter<number>();
  @Output() statusChange = new EventEmitter<{ id: number; statusId: number }>();
  showDeleteModal: boolean = false;
  selectedProgram: any;
  constructor(private router: Router) {}

  onView() {
    this.viewDetails.emit(this.program.Id);
  }

  edit() {
    this.router.navigate(['/add-general-program'], {
      queryParams: { id: this.program.Id },
    });
  }
  navigateToContent() {
    this.router.navigate(['/generalPrograms/content'], {
      queryParams: { id: this.program.Id },
    });
  }
  navigateToInfo() {
    this.router.navigate(['/generalPrograms/info'], {
      queryParams: { id: this.program.Id },
    });
  }
  onDelete() {
    this.showDeleteModal = false;
    this.deleteProgram.emit(this.program.id);
  }
  showDelete(): boolean {
    this.showDeleteModal = !this.showDeleteModal;
    return this.showDeleteModal;
  }
  selectedProgramForDelete(program: any) {
    this.selectedProgram = program;
    this.showDeleteModal = true;
  }
  onTrainees() {
     this.router.navigate(['/generalPrograms/trainees'], {
      queryParams: { id: this.program.Id },
    });
    // this.viewTrainees.emit(this.program.id); 
  }

  onStatusChange(event: any) {
    const statusId = parseInt(event.target.value);
    if (!isNaN(statusId)) {
      this.statusChange.emit({ 
        id: this.program.id,
        statusId: statusId,
      });
    }
  }
}
