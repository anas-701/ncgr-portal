import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-program-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './program-card.component.html',
  styleUrls: ['./program-card.component.scss'],
})
export class ProgramCardComponent {
  @Input() program: any = {};
  @Input() statusOptions: any[] = [];

  @Output() viewDetails = new EventEmitter<number>();
  @Output() editProgram = new EventEmitter<number>();
  @Output() deleteProgram = new EventEmitter<number>();
  @Output() viewTrainingContent = new EventEmitter<number>();
  @Output() viewTrainees = new EventEmitter<number>();
  @Output() statusChange = new EventEmitter<{ id: number; statusId: number }>();

  constructor(private router: Router) {}

  onView() {
    this.viewDetails.emit(this.program.id);
  }

  edit() {
    this.router.navigate(['/add-training-program'], {
      queryParams: { id: this.program.id },
    });
  }
  navigateToTrainingContent() {
    this.router.navigate(['/training-content'], {
      queryParams: { id: this.program.id, title: this.program.title },
    });
  }
  onDelete() {
    this.deleteProgram.emit(this.program.id);
  }

  onTrainingContent() {
    this.viewTrainingContent.emit(this.program.id);
  }

  onTrainees() {
    this.viewTrainees.emit(this.program.id);
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
