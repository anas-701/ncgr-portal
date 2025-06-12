import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopQuestionsViewComponent } from './workshop-questions-view.component';

describe('WorkshopQuestionsViewComponent', () => {
  let component: WorkshopQuestionsViewComponent;
  let fixture: ComponentFixture<WorkshopQuestionsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopQuestionsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopQuestionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
