import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DfDateFieldComponent } from './df-date-field.component';

describe('DfDateFieldComponent', () => {
  let component: DfDateFieldComponent;
  let fixture: ComponentFixture<DfDateFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DfDateFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DfDateFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
