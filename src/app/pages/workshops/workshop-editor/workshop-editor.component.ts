import { Component, inject, OnInit } from '@angular/core';
import { SideBarComponent } from '../../side-bar/side-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SharedStepsComponent } from '../../../@shared/shared-steps/shared-steps.component';
import { WorkshopEditorStepOneComponent } from './workshop-editor-step-one/workshop-editor-step-one.component';
import { WorkshopEditorService } from './services/workshop-editor.service';
import { WorkshopEditorStepTwoComponent } from './workshop-editor-step-two/workshop-editor-step-two.component';
import { WorkshopEditorStepThreeComponent } from './workshop-editor-step-three/workshop-editor-step-three.component';
import { WorkshopEditorStepFourComponent } from './workshop-editor-step-four/workshop-editor-step-four.component';

@Component({
  selector: 'app-workshop-editor',
  imports: [
    SideBarComponent,
    ReactiveFormsModule,
    SharedStepsComponent,
    WorkshopEditorStepOneComponent,
    WorkshopEditorStepTwoComponent,
    WorkshopEditorStepThreeComponent,
    WorkshopEditorStepFourComponent
  ],
  templateUrl: './workshop-editor.component.html',
  styleUrl: './workshop-editor.component.scss'
})
export class WorkshopEditorComponent implements OnInit{
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _workshopEditorService=inject(WorkshopEditorService)
  currentStep = 1;

  steps: any[] = [
    {
      title: 'الخطوة الأولى',
      subtitle: 'المعلومات الأساسية'
    },
    {
      title: 'الخطوة الثانية',
      subtitle: 'الفئة المستهدفة'
    },
    {
      title: 'الخطوة الثالثة',
      subtitle: 'الموعد والمكان'
    },
    {
      title: 'الخطوة الرابعة',
      subtitle: 'الشهادة والرسوم'
    },
  ]
  ngOnInit(): void {
    this.setFormValue()
  }
  updateStep(stepNumber:number){
    console.log('step number',stepNumber)
    this.currentStep=stepNumber;
  }
  setFormValue(){
    const course = {
      title: "مقدمة في تطوير الويب",
      titleEn: "Introduction to Web Development",
      description: "دورة شاملة لتعلم أساسيات تطوير الويب باستخدام HTML وCSS وJavaScript.",
      descriptionEn: "A comprehensive course to learn the basics of web development using HTML, CSS, and JavaScript.",
      trainerName: "أحمد علي",
      trainerNameEn: "Ahmed Ali",
      trainerEmail: "ahmed.ali@example.com",
      image: "https://example.com/images/web-development.jpg",
      language: "Arabic"
    };
    this._workshopEditorService.updateMatterDetails(course)
  }
}
