import { Component, DestroyRef, inject, input, InputSignal, OnInit } from '@angular/core';
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
import { WorkshopService } from '../services/workshop.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  _workshopService=inject(WorkshopService);
  _destroyRef=inject(DestroyRef)
  currentStep = 1;
  workshopIdentifier:InputSignal<number|undefined>=input<number|undefined>()
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
    this._workshopEditorService.updateWorkShop(undefined)
    this.getById();
  }
  updateStep(stepNumber:number){
    console.log('step number',stepNumber)
    this.currentStep=stepNumber;
  }
  getById(){
    console.log(this.workshopIdentifier())
    if(!this.workshopIdentifier()) return 
    this._workshopService.getWorkshopById(this.workshopIdentifier() as number)
    .pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next:(res)=>{
        const data = res.data
        data.workshopPicture =data.workshopPicturePath;
        setTimeout(() => {
          this._workshopEditorService.updateWorkShop(data)
        }, 500);
      }
    })
  }
}
