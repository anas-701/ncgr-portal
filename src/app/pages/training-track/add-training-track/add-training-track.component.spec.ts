import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainingTrackComponent } from './add-training-track.component';

describe('AddTrainingTrackComponent', () => {
  let component: AddTrainingTrackComponent;
  let fixture: ComponentFixture<AddTrainingTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTrainingTrackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTrainingTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
