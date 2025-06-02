import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopEditorStepOneComponent } from './workshop-editor-step-one.component';

describe('WorkshopEditorStepOneComponent', () => {
  let component: WorkshopEditorStepOneComponent;
  let fixture: ComponentFixture<WorkshopEditorStepOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopEditorStepOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopEditorStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
