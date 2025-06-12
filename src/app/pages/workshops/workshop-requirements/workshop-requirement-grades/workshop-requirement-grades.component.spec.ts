import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopRequirementGradesComponent } from './workshop-requirement-grades.component';

describe('WorkshopRequirementGradesComponent', () => {
  let component: WorkshopRequirementGradesComponent;
  let fixture: ComponentFixture<WorkshopRequirementGradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopRequirementGradesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopRequirementGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
