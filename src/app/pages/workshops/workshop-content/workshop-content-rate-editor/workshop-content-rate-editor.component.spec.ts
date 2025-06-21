import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopContentRateEditorComponent } from './workshop-content-rate-editor.component';

describe('WorkshopContentRateEditorComponent', () => {
  let component: WorkshopContentRateEditorComponent;
  let fixture: ComponentFixture<WorkshopContentRateEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopContentRateEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopContentRateEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
