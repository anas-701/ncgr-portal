import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedRateComponent } from './shared-rate.component';

describe('SharedRateComponent', () => {
  let component: SharedRateComponent;
  let fixture: ComponentFixture<SharedRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedRateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
