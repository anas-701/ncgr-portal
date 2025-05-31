import { Component } from '@angular/core';
import { HomePageData } from '../constants/home-page-data';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  standalone:true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  bannerImages = HomePageData.bannerImages;
  aboutSection = HomePageData.aboutSection;
  newsSection = HomePageData.newsSection;
  accomplishments = HomePageData.accomplishments;
  interactiveEntities = HomePageData.interactiveEntities;
  todayDate = new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
