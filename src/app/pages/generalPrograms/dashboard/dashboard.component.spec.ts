import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralProgramsDashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: GeneralProgramsDashboardComponent;
  let fixture: ComponentFixture<GeneralProgramsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralProgramsDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralProgramsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
