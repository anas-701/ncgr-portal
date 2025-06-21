import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Lecture } from '../../../../models/section.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SectionsService } from '../../../../services/training-content-service';
import { DomSanitizer } from '@angular/platform-browser';
import { ToasterService } from '../../../../../../@shared/toaster.service';

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
  lectureType: string = 'text'; // Default type, can be changed based on the lecture type
constructor(private sectionService: SectionsService,private sanitizer: DomSanitizer,private toaster: ToasterService) {}
 
getLectureById(id: number): void {
  this.sectionService.getLectureById(id).subscribe({
      next: (response) => {
        this.editedLecture = response.data;
        this.lectureType = this.getLectureTypeName(this.editedLecture.typeId);
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
      if (!this.isValidLecture()) {
        this.toaster.error('الرجاء ملء جميع الحقول المطلوبة بشكل صحيح.');
        return;
      }
       this.lectureType = this.getLectureTypeName(this.editedLecture.typeId);
      const formData = new FormData();
            formData.append('id',this.editedLecture.id.toString());
            formData.append('trainingProgramDepartment', this.editedLecture.trainingProgramDepartment.toString());
            formData.append('typeId', this.editedLecture.typeId.toString());
            formData.append('titleAr', this.editedLecture.titleAr);
            formData.append('titleEn', this.editedLecture.titleEn);

            if (this.lectureType === 'video') {
                formData.append('videoFile', this.editedLecture.videoFile? this.editedLecture.videoFile : '');
                formData.append('youTubeLink', this.editedLecture.youTubeLink? this.editedLecture.youTubeLink : '');
            } else if (this.lectureType === 'text') {
              formData.append('contentDetails', this.editedLecture.contentDetails );
            } else if (this.lectureType === 'pdf') {
              formData.append('pdfFile', this.editedLecture.pdfFile? this.editedLecture.pdfFile : '');
            } else if (this.lectureType === 'audio') {
              formData.append('soundFile', this.editedLecture.soundFile? this.editedLecture.soundFile : '');
            } else if (this.lectureType === 'image') {
              formData.append('image', this.editedLecture.image? this.editedLecture.image : '');
            } else if (this.lectureType === 'test') {
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
isValidLecture(): boolean {
  const { lectureType, editedLecture } = this;

  // تحقق من العناوين حسب الباترن
  const arabicRegex = /^[\u0600-\u06FF\s]+$/;
  const englishRegex = /^[A-Za-z\s]+$/;

  const isArabicTitleValid = arabicRegex.test(editedLecture.titleAr?.trim() || '');
  const isEnglishTitleValid = englishRegex.test(editedLecture.titleEn?.trim() || '');

  if (!isArabicTitleValid || !isEnglishTitleValid) return false;

  if (lectureType === 'video') {
    if (!editedLecture.videoFile && !editedLecture.youTubeLink) return false;
    if (editedLecture.videoFile && editedLecture.youTubeLink) return false;
    
    return true;
  }

  if (lectureType === 'pdf' ) return !!editedLecture.pdfFile; 
  if ( lectureType === 'audio' ) return !!editedLecture.soundFile; 
  if ( lectureType === 'image') return !!editedLecture.file; 

  if (lectureType === 'text') return !!editedLecture.content?.trim();

  if (lectureType === 'test') {
    const { examePeriod, exameTotal, exameSuccusDegrie, exameTypeId, exameSite, exameIsTime, exameDate, exameTime } = editedLecture;

    if (!examePeriod || examePeriod <= 0) return false;
    if (!exameTotal || !exameSuccusDegrie || exameSuccusDegrie > exameTotal) return false;
    if (!exameTypeId) return false;

    if (exameTypeId === 2 && !exameSite?.trim()) return false;

    if (exameIsTime === true) {
      if (!exameDate || !exameTime) return false;
    }

    return true;
  }

  return false;
}

}