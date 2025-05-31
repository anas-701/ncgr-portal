import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Lecture } from '../../../../models/section.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SectionsService } from '../../../../services/training-content-service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-lecture-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-lecture-modal.component.html',
  styleUrls: ['./edit-lecture-modal.component.scss']
})
export class EditLectureModalComponent {
  @Input() isOpen = false;
  @Input() lecture: Lecture | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  previewUrl: string | null = null;
  editedLecture?: any;
constructor(private sectionService: SectionsService,private sanitizer: DomSanitizer) {}
 
getLectureById(id: number): void {
  this.sectionService.getLectureById(id).subscribe({
      next: (response) => {
        this.editedLecture = response.data;
        console.log('Fetched lecture:', this.editedLecture);
      },
      error: (error) => {
        console.error('Error fetching sections:', error);
      }
    });
}

 ngOnChanges(): void {
    if (this.lecture) {
           this.getLectureById(this.lecture.id);
    }
    console.log('Lecture:', this.editedLecture);
    
  }

  onSave(): void {
    if (this.editedLecture) {
      const lectureType = this.getLectureTypeName(this.editedLecture.typeId);
      const formData = new FormData();
            formData.append('id',this.editedLecture.id.toString());
            formData.append('trainingProgramDepartment', this.editedLecture.trainingProgramDepartment.toString());
            formData.append('typeId', this.editedLecture.typeId.toString());
            formData.append('titleAr', this.editedLecture.titleAr);
            formData.append('titleEn', this.editedLecture.titleEn);

            if (lectureType === 'video') {
                formData.append('videoFile', this.editedLecture.videoFile? this.editedLecture.videoFile : '');
                formData.append('youTubeLink', this.editedLecture.youTubeLink? this.editedLecture.youTubeLink : '');
            } else if (lectureType === 'text') {
              formData.append('contentDetails', this.editedLecture.contentDetails );
            } else if (lectureType === 'pdf') {
              formData.append('pdfFile', this.editedLecture.pdfFile? this.editedLecture.pdfFile : '');
            } else if (lectureType === 'audio') {
              formData.append('soundFile', this.editedLecture.soundFile? this.editedLecture.soundFile : '');
            } else if (lectureType === 'image') {
              formData.append('image', this.editedLecture.image? this.editedLecture.image : '');
            } else if (lectureType === 'test') {
              formData.append('exameTypeId', (this.editedLecture.exameTypeId || 0).toString());
              formData.append('exameTotal', this.editedLecture.exameTotal.toString());
              formData.append('exameSuccusDegrie', this.editedLecture.exameSuccusDegrie.toString());
              if (this.editedLecture.exameTypeId === 2) {
                formData.append('exameSite', this.editedLecture.exameSite ? this.editedLecture.exameSite : '');
              }
              formData.append('exameIsTime', this.editedLecture.exameIsTime  ? 'true' : 'false');
              if (this.editedLecture.exameIsTime ) {
                formData.append('exameDate', this.editedLecture.exameDate ? this.editedLecture.exameDate : '');
                formData.append('exameTime', this.editedLecture.exameTime ? this.editedLecture.exameTime : '');
              }
              formData.append('examePeriod', this.editedLecture.examePeriod.toString());
            }
      this.save.emit(formData);
    }
    this.closeModal();
    
}


  closeModal(): void {
    this.editedLecture = null;
    this.revokePreviewUrl();
    this.close.emit();
  }

  onFileChange(event: any): void {
    this.revokePreviewUrl();
    const file = event.target.files[0];
    if (file && this.editedLecture) {
      switch (this.editedLecture.typeId) {
        case 2: 
            this.editedLecture.videoFile = file; 
          break;
        case 3: 
          this.editedLecture.pdfFile = file;
          break;
        case 4: 
          this.editedLecture.soundFile = file;
          break;
        case 5: 
          this.editedLecture.image = file;
          break;
      }
      this.previewUrl = URL.createObjectURL(file);
    }
  }

  getLectureTypeName(type?: number): string {
    switch (type) {
      case 1:
        return 'text';
      case 2:
        return 'video';
      case 3:
        return 'pdf';
      case 4:
        return 'audio';
      case 5:
        return 'image';
      case 6:
        return 'test';
      default:
        return 'lecture';
    }
  }
  getSafeYoutubeUrl(url: string) {
  // Extract video ID from YouTube URL
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  const videoId = (match && match[2].length === 11) ? match[2] : null;
  return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
}
downloadFile() {
  if (this.editedLecture.pdfFile) {
    const a = document.createElement('a');
    a.href= this.previewUrl!;
    a.download = this.editedLecture.pdfFile.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
private revokePreviewUrl() {
  if (this.previewUrl) {
    URL.revokeObjectURL(this.previewUrl);
    this.previewUrl = null;
  }
}

}