import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopReschedulingComponent } from './workshop-rescheduling.component';

describe('WorkshopReschedulingComponent', () => {
  let component: WorkshopReschedulingComponent;
  let fixture: ComponentFixture<WorkshopReschedulingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopReschedulingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopReschedulingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
