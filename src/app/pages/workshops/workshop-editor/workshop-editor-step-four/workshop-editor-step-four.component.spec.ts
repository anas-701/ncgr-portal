import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopEditorStepFourComponent } from './workshop-editor-step-four.component';

describe('WorkshopEditorStepFourComponent', () => {
  let component: WorkshopEditorStepFourComponent;
  let fixture: ComponentFixture<WorkshopEditorStepFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopEditorStepFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopEditorStepFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
