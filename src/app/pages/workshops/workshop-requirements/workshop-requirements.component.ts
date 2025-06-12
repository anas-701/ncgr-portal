import { Component } from '@angular/core';
import { SideBarComponent } from '../../side-bar/side-bar.component';

import { sessions } from './workshop-requirements.fake';
import { WorkshopRequirementItemComponent, WorkshopSession } from './components/workshop-requirement-item/workshop-requirement-item.component';
import { WorkshopRequirmentEditorComponent } from './workshop-requirment-editor/workshop-requirment-editor.component';
import { WorkshopExamEditorComponent } from './workshop-exam-editor/workshop-exam-editor.component';
import { WorkshopMultiChoiceQuestionEditorComponent } from './components/workshop-multi-choice-question-editor/workshop-multi-choice-question-editor.component';
import { WorkshopCorrectQuestionEditorComponent } from './components/workshop-correct-question-editor/workshop-correct-question-editor.component';
import { WorkshopQuestionsViewComponent } from './components/workshop-questions-view/workshop-questions-view.component';

@Component({
  selector: 'app-workshop-requirements',
  imports: [
    SideBarComponent,
    WorkshopExamEditorComponent,
    WorkshopRequirmentEditorComponent,
    WorkshopRequirementItemComponent,
    WorkshopMultiChoiceQuestionEditorComponent,
    WorkshopCorrectQuestionEditorComponent,
    WorkshopQuestionsViewComponent
  ],
  templateUrl: './workshop-requirements.component.html',
  styleUrl: './workshop-requirements.component.scss'
})
export class WorkshopRequirementsComponent {
  sessions:WorkshopSession[]=sessions;
  selectedSession!:WorkshopSession;
  onClick(e:any){
    console.log(e)
    this.selectedSession=e
  }
}
