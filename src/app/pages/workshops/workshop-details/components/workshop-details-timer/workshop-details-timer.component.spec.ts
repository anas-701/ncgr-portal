import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopDetailsTimerComponent } from './workshop-details-timer.component';

describe('WorkshopDetailsTimerComponent', () => {
  let component: WorkshopDetailsTimerComponent;
  let fixture: ComponentFixture<WorkshopDetailsTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopDetailsTimerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopDetailsTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
