import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopRequirementAttendanceComponent } from './workshop-requirement-attendance.component';

describe('WorkshopRequirementAttendanceComponent', () => {
  let component: WorkshopRequirementAttendanceComponent;
  let fixture: ComponentFixture<WorkshopRequirementAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopRequirementAttendanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopRequirementAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
