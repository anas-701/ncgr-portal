import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-shared-steps',
  imports: [],
  templateUrl: './shared-steps.component.html',
  styleUrl: './shared-steps.component.scss'
})
export class SharedStepsComponent {
  currentStep:InputSignal<number>=input.required()
  steps:InputSignal<any[]>=input.required()
}
