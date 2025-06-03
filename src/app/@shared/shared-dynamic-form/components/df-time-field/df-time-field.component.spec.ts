import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DfTimeFieldComponent } from './df-time-field.component';

describe('DfTimeFieldComponent', () => {
  let component: DfTimeFieldComponent;
  let fixture: ComponentFixture<DfTimeFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DfTimeFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DfTimeFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
