import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopRequirmentEditorComponent } from './workshop-requirment-editor.component';

describe('WorkshopRequirmentEditorComponent', () => {
  let component: WorkshopRequirmentEditorComponent;
  let fixture: ComponentFixture<WorkshopRequirmentEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopRequirmentEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopRequirmentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
