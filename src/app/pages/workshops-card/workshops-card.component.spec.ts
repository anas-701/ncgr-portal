import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopsCardComponent } from './workshops-card.component';

describe('WorkshopsCardComponent', () => {
  let component: WorkshopsCardComponent;
  let fixture: ComponentFixture<WorkshopsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
