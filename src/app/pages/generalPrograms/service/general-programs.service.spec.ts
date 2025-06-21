import { TestBed } from '@angular/core/testing';

import { GeneralProgramsService } from './general-programs.service';

describe('GeneralProgramsService', () => {
  let service: GeneralProgramsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralProgramsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
