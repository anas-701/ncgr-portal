import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopRequirementsComponent } from './workshop-requirements.component';

describe('WorkshopRequirementsComponent', () => {
  let component: WorkshopRequirementsComponent;
  let fixture: ComponentFixture<WorkshopRequirementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopRequirementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
