import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopDetailsImportantDatesComponent } from './workshop-details-important-dates.component';

describe('WorkshopDetailsImportantDatesComponent', () => {
  let component: WorkshopDetailsImportantDatesComponent;
  let fixture: ComponentFixture<WorkshopDetailsImportantDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopDetailsImportantDatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopDetailsImportantDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
