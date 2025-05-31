import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ACADEMY_DATA } from '../constants/academy-data.constant';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about-academy',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './about-academy.component.html',
  styleUrl: './about-academy.component.scss'
})
export class AboutAcademyComponent {
  academyData = ACADEMY_DATA;

}
