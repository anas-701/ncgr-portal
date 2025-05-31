import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingTrackComponent } from './training-track.component';

describe('TrainingTrackComponent', () => {
  let component: TrainingTrackComponent;
  let fixture: ComponentFixture<TrainingTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingTrackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
