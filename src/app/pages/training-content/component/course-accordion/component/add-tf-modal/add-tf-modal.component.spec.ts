import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTfModalComponent } from './add-tf-modal.component';

describe('AddTfModalComponent', () => {
  let component: AddTfModalComponent;
  let fixture: ComponentFixture<AddTfModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTfModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTfModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
