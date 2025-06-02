import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DfRadioFieldComponent } from './df-radio-field.component';

describe('DfRadioFieldComponent', () => {
  let component: DfRadioFieldComponent;
  let fixture: ComponentFixture<DfRadioFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DfRadioFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DfRadioFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
