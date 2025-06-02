import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DfInputFieldComponent } from './df-input-field.component';

describe('DfInputFieldComponent', () => {
  let component: DfInputFieldComponent;
  let fixture: ComponentFixture<DfInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DfInputFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DfInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
