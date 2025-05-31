import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TrainingProgramsService } from '../../@core/services/training-programs.service';
import {
  
  ProgramDepartment,
  GetAllProgramsResponse,
} from '../../@models/training-program.model';

@Component({
  selector: 'app-training-program-details',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule],
  templateUrl: './training-program-details.component.html',
  styleUrl: './training-program-details.component.scss',
})
export class TrainingProgramDetailsComponent implements OnInit {
  programId: number = 12; // Default to ID 12
  program: GetAllProgramsResponse | null = null;
  departments: ProgramDepartment[] = [];
  loading = true;

  constructor(
    private trainingProgramsService: TrainingProgramsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get ID from route if available
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.programId = +params['id'];
      }
      this.loadProgramDetails();
    });
  }

  loadProgramDetails(): void {
    this.loading = true;

    // Get program details
    this.trainingProgramsService
      .getTrainingProgramById(this.programId.toString())
      .subscribe({
        next: (response) => {
          if (response.code === 200 && response.data) {
            this.program = response.data;
            // After getting program details, fetch departments
            this.loadProgramDepartments();
          } else {
            this.loading = false;
          }
        },
        error: (error) => {
          console.error('Error fetching program details:', error);
          this.loading = false;
        },
      });
  }

  loadProgramDepartments(): void {
    this.trainingProgramsService
      .getProgramDepartments(this.programId)
      .subscribe({
        next: (response) => {
          if (response.code === 200 && response.data?.result) {
            this.departments = response.data.result;
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching program departments:', error);
          this.loading = false;
        },
      });
  }

  // Helper function to determine icon based on lecture type
  getLectureIcon(typeId: number): string {
    switch (typeId) {
      case 1:
        return 'bi bi-file-text'; // Content/text
      case 2:
        return 'bi bi-file-pdf'; // PDF
      case 3:
        return 'bi bi-play-circle'; // Video
      case 4:
        return 'bi bi-headphones'; // Audio
      default:
        return 'bi bi-file';
    }
  }
}
