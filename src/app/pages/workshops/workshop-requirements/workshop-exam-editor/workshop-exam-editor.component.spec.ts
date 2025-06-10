import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopExamEditorComponent } from './workshop-exam-editor.component';

describe('WorkshopExamEditorComponent', () => {
  let component: WorkshopExamEditorComponent;
  let fixture: ComponentFixture<WorkshopExamEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopExamEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopExamEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
