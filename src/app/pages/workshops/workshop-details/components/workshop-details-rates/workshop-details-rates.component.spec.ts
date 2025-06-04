import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopDetailsRatesComponent } from './workshop-details-rates.component';

describe('WorkshopDetailsRatesComponent', () => {
  let component: WorkshopDetailsRatesComponent;
  let fixture: ComponentFixture<WorkshopDetailsRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopDetailsRatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopDetailsRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
