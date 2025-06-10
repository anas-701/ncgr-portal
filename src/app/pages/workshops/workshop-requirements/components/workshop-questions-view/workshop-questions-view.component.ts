import { Component, Input } from '@angular/core';
import { WorkshopSession } from '../workshop-requirement-item/workshop-requirement-item.component';

@Component({
  selector: 'app-workshop-questions-view',
  imports: [],
  templateUrl: './workshop-questions-view.component.html',
  styleUrl: './workshop-questions-view.component.scss'
})
export class WorkshopQuestionsViewComponent {
  @Input() session?:WorkshopSession;
}
