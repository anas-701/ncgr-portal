import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopMultiChoiceQuestionEditorComponent } from './workshop-multi-choice-question-editor.component';

describe('WorkshopMultiChoiceQuestionEditorComponent', () => {
  let component: WorkshopMultiChoiceQuestionEditorComponent;
  let fixture: ComponentFixture<WorkshopMultiChoiceQuestionEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopMultiChoiceQuestionEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopMultiChoiceQuestionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
