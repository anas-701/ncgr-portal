import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingTrakeDetailsComponent } from './training-trake-details.component';

describe('TrainingTrakeDetailsComponent', () => {
  let component: TrainingTrakeDetailsComponent;
  let fixture: ComponentFixture<TrainingTrakeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingTrakeDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingTrakeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
