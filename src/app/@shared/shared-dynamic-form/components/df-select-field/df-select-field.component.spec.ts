import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DfSelectFieldComponent } from './df-select-field.component';

describe('DfSelectFieldComponent', () => {
  let component: DfSelectFieldComponent;
  let fixture: ComponentFixture<DfSelectFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DfSelectFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DfSelectFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
