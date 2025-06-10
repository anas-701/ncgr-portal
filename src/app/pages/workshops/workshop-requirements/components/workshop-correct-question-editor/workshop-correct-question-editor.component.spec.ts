import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopCorrectQuestionEditorComponent } from './workshop-correct-question-editor.component';

describe('WorkshopCorrectQuestionEditorComponent', () => {
  let component: WorkshopCorrectQuestionEditorComponent;
  let fixture: ComponentFixture<WorkshopCorrectQuestionEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopCorrectQuestionEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopCorrectQuestionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
