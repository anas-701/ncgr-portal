import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGeneralProgramsComponent } from './add-general-programs.component';

describe('AddGeneralProgramsComponent', () => {
  let component: AddGeneralProgramsComponent;
  let fixture: ComponentFixture<AddGeneralProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGeneralProgramsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGeneralProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
