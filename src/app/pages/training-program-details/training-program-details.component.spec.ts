import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingProgramDetailsComponent } from './training-program-details.component';

describe('TrainingProgramDetailsComponent', () => {
  let component: TrainingProgramDetailsComponent;
  let fixture: ComponentFixture<TrainingProgramDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingProgramDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingProgramDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
