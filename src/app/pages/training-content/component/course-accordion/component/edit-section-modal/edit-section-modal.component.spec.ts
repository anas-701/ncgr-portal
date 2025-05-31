import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSectionModalComponent } from './edit-section-modal.component';

describe('EditSectionModalComponent', () => {
  let component: EditSectionModalComponent;
  let fixture: ComponentFixture<EditSectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSectionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
