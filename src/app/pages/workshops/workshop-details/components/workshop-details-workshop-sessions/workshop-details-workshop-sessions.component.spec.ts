import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopDetailsWorkshopSessionsComponent } from './workshop-details-workshop-sessions.component';

describe('WorkshopDetailsWorkshopSessionsComponent', () => {
  let component: WorkshopDetailsWorkshopSessionsComponent;
  let fixture: ComponentFixture<WorkshopDetailsWorkshopSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopDetailsWorkshopSessionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopDetailsWorkshopSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
