import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainingProgramComponent } from './add-training-program.component';

describe('AddTrainingProgramComponent', () => {
  let component: AddTrainingProgramComponent;
  let fixture: ComponentFixture<AddTrainingProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTrainingProgramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTrainingProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
