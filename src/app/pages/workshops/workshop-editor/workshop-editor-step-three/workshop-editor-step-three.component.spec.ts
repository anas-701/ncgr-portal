import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopEditorStepThreeComponent } from './workshop-editor-step-three.component';

describe('WorkshopEditorStepThreeComponent', () => {
  let component: WorkshopEditorStepThreeComponent;
  let fixture: ComponentFixture<WorkshopEditorStepThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopEditorStepThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopEditorStepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
