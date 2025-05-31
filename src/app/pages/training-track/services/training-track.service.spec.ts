import { TestBed } from '@angular/core/testing';

import { TrainingTrackService } from './training-track.service';

describe('TrainingTrackService', () => {
  let service: TrainingTrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingTrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
