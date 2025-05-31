import { Component } from '@angular/core';
import { Course, COURSES } from '../constants/courses.constant';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
export interface ACourse {
  title: string;
  image: string;
  ratingText: string;
  government: string;
  description: string;
  reportText: string;
  language: string;
}

@Component({
  selector: 'app-training-programs',
  standalone:true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './training-programs.component.html',
  styleUrl: './training-programs.component.scss'
})
export class TrainingProgramsComponent {
  courses: Course[] = COURSES;
}
