import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopContentComponent } from './workshop-content.component';

describe('WorkshopContentComponent', () => {
  let component: WorkshopContentComponent;
  let fixture: ComponentFixture<WorkshopContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
