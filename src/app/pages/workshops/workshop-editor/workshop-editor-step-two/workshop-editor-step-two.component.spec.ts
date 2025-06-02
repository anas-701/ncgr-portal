import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopEditorStepTwoComponent } from './workshop-editor-step-two.component';

describe('WorkshopEditorStepTwoComponent', () => {
  let component: WorkshopEditorStepTwoComponent;
  let fixture: ComponentFixture<WorkshopEditorStepTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopEditorStepTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopEditorStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
