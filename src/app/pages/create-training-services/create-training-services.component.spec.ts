import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTrainingServicesComponent } from './create-training-services.component';

describe('CreateTrainingServicesComponent', () => {
  let component: CreateTrainingServicesComponent;
  let fixture: ComponentFixture<CreateTrainingServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTrainingServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTrainingServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
