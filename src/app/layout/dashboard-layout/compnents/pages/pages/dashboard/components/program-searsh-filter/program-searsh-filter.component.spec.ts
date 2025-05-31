import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramSearshFilterComponent } from './program-searsh-filter.component';

describe('ProgramSearshFilterComponent', () => {
  let component: ProgramSearshFilterComponent;
  let fixture: ComponentFixture<ProgramSearshFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramSearshFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramSearshFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
