import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopRequirementItemComponent } from './workshop-requirement-item.component';

describe('WorkshopRequirementItemComponent', () => {
  let component: WorkshopRequirementItemComponent;
  let fixture: ComponentFixture<WorkshopRequirementItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopRequirementItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopRequirementItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
