import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMcqModalComponent } from './add-mcq-modal.component';

describe('AddMcqModalComponent', () => {
  let component: AddMcqModalComponent;
  let fixture: ComponentFixture<AddMcqModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMcqModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMcqModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
