import { Component, OnInit } from '@angular/core';
import { SideBarComponent } from '../../side-bar/side-bar.component';
import { TrainingTrackService } from '../services/training-track.service';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { GetAllProgramsResponse } from '../../../@models/training-program.model';

interface PathTrainingProgram {
  id: number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  aboutAr: string;
  aboutEn: string;

}

interface TrackDetails {
  id: number;
  titleAr: string;
  titleEn: string;
  isArabic: boolean;
  isEnglish: boolean;
  statusName: string;
  trainingProgramsCount: number;
  generalProgramsCount: number;
  pathTrainingProgram: GetAllProgramsResponse[];
  pathTrainingProgramCount: number;
}

@Component({
  selector: 'app-training-trake-details',
  standalone: true,
  imports: [SideBarComponent, CommonModule, RouterLink],
  templateUrl: './training-trake-details.component.html',
  styleUrl: './training-trake-details.component.scss',
})
export class TrainingTrakeDetailsComponent implements OnInit {
  trackId: string | null = null;
  trackDetails: TrackDetails | null = null;
  loading = true;
  error = '';
  selectedLanguage = 'ar';

  constructor(
    private trackService: TrainingTrackService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.trackId = this.route.snapshot.paramMap.get('id');
    if (this.trackId) {
      this.loadTrackDetails(this.trackId);
    } else {
      this.error = 'No track ID provided';
      this.loading = false;
    }
  }

  loadTrackDetails(id: string) {
    this.loading = true;
    this.trackService
      .getTrackById(id, this.selectedLanguage)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          if (response.code === 200 && response.data) {
            this.trackDetails = response.data;
            console.log(this.trackDetails);
          } else {
            this.error = 'Failed to load track details';
          }
        },
        error: (err) => {
          console.error('Error loading track details:', err);
          this.error = 'Error loading track details';
        },
      });
  }

  getTitle(): string {
    if (!this.trackDetails) return 'المسار المالي'; // Default fallback
    return this.selectedLanguage === 'ar'
      ? this.trackDetails.titleAr
      : this.trackDetails.titleEn;
  }

  getLanguageText(): string {
    if (!this.trackDetails) return 'العربية والانجليزية';
    const languages = [];
    if (this.trackDetails.isArabic) languages.push('العربية');
    if (this.trackDetails.isEnglish) languages.push('الانجليزية');
    return languages.join(' و ');
  }

  onEdit() {
    if (this.trackId) {
      this.router.navigate(['/training-track/edit', this.trackId]);
    }
  }

  changeLanguage(lang: string) {
    this.selectedLanguage = lang;
    if (this.trackId) {
      this.loadTrackDetails(this.trackId);
    }
  }
}
