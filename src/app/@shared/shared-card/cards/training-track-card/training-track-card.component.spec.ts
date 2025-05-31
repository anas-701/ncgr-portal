import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingTrackCardComponent } from './training-track-card.component';

describe('TrainingTrackCardComponent', () => {
  let component: TrainingTrackCardComponent;
  let fixture: ComponentFixture<TrainingTrackCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingTrackCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingTrackCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
