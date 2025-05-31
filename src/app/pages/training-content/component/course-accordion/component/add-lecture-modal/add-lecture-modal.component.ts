import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Lecture } from '../../../../models/section.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-lecture-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-lecture-modal.component.html',
  styleUrls: ['./add-lecture-modal.component.scss']
})
export class AddLectureModalComponent {
  @Input() isOpen = false;
  @Input() sectionId : any;
  @Input() lectureType: 'text' | 'video' | 'pdf' | 'audio' | 'image' | 'test' = 'text';
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  previewUrl: string | null = null;
  newLecture: any = {
    titleAr: '',
    titleEn: '',
    type: 'text',
    videoType: 'file', 
    testType: 'electronic',
    hasDeadline: 'false' 
  };
constructor(private sanitizer: DomSanitizer) {}
  getLectureTypeName(type: string): string {
    switch(type) {
      case 'text': return 'نص';
      case 'video': return 'فيديو';
      case 'pdf': return 'وثيقة (PDF)';
      case 'audio': return 'ملف صوت';
      case 'image': return 'ملف صورة';
      case 'test': return 'اختبار';
      default: return 'محاضرة';
    }
  }

  closeModal(): void {
    this.close.emit();
    this.resetForm();
  }

    
onSave(): void {
  this.newLecture.type = this.lectureType;
const formData = new FormData();
formData.append('id', '0');
formData.append('trainingProgramDepartment', this.sectionId.toString());
formData.append('typeId', this.getTypeId(this.lectureType).toString());
formData.append('titleAr', this.newLecture.titleAr);
formData.append('titleEn', this.newLecture.titleEn);

if (this.lectureType === 'video') {
  if (this.newLecture.videoType === 'file') {
    formData.append('videoFile', this.newLecture.file);
  } else if (this.newLecture.videoType === 'link') {
    formData.append('youTubeLink', this.newLecture.file);
  }
} else if (this.lectureType === 'text') {
  formData.append('contentDetails', this.newLecture.content);
} else if (this.lectureType === 'pdf') {
  formData.append('pdfFile', this.newLecture.file);
} else if (this.lectureType === 'audio') {
  formData.append('soundFile', this.newLecture.file);
} else if (this.lectureType === 'image') {
  formData.append('image', this.newLecture.file);
} else if (this.lectureType === 'test') {
  formData.append('exameTypeId', (this.newLecture.testType === 'electronic' ? '1' : '2'));
  formData.append('exameTotal', this.newLecture.totalScore.toString());
  formData.append('exameSuccusDegrie', this.newLecture.passingScore.toString());
  
  if (this.newLecture.testType === 'attendance') {
    formData.append('exameSite', this.newLecture.location);
  }
  
  formData.append('exameIsTime', this.newLecture.hasDeadline === 'true' ? 'true' : 'false');
  
  if (this.newLecture.hasDeadline === 'true') {
    formData.append('exameDate', this.newLecture.testDate);
    formData.append('exameTime', this.newLecture.testTime);
  }
  
  formData.append('examePeriod', this.newLecture.duration.toString());
}
  this.save.emit(formData);
  this.closeModal();
  this.resetForm();
}

private getTypeId(type: string): number {
  switch(type) {
    case 'text': return 1;
    case 'video': return 2;
    case 'pdf': return 3;
    case 'audio': return 4;
    case 'image': return 5;
    case 'test': return 6;
    default: return 0;
  }
}

  onFileChange(event: any): void {
    this.revokePreviewUrl();
    const file = event.target.files[0];
    if (file) {
      this.newLecture.file = file;
      this.newLecture.fileUrl = file.name;
    }
    this.previewUrl = URL.createObjectURL(file);
  }

  private resetForm(): void {
    this.newLecture = {
      titleAr: '',
      titleEn: '',
      type: 'text',
      videoType: 'file',
      testType: 'electronic',
      hasDeadline: 'false',
      file: null,
    };
    this.previewUrl = null;
  }
getSafeYoutubeUrl(url: string) {
  // Extract video ID from YouTube URL
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  const videoId = (match && match[2].length === 11) ? match[2] : null;
  return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
}

downloadFile() {
  if (this.newLecture.file) {
    const a = document.createElement('a');
    a.href= this.previewUrl!;
    a.download = this.newLecture.file.name;
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