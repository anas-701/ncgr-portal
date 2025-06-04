import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopDetailsAboutComponent } from './workshop-details-about.component';

describe('WorkshopDetailsAboutComponent', () => {
  let component: WorkshopDetailsAboutComponent;
  let fixture: ComponentFixture<WorkshopDetailsAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopDetailsAboutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopDetailsAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
