import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTextModalComponent } from './add-text-modal.component';

describe('AddTextModalComponent', () => {
  let component: AddTextModalComponent;
  let fixture: ComponentFixture<AddTextModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTextModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTextModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
