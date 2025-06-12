import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopEnrollmentsComponent } from './workshop-enrollments.component';

describe('WorkshopEnrollmentsComponent', () => {
  let component: WorkshopEnrollmentsComponent;
  let fixture: ComponentFixture<WorkshopEnrollmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopEnrollmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopEnrollmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
