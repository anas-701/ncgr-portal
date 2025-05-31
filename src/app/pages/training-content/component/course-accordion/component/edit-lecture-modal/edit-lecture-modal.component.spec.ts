import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLectureModalComponent } from './edit-lecture-modal.component';

describe('EditLectureModalComponent', () => {
  let component: EditLectureModalComponent;
  let fixture: ComponentFixture<EditLectureModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLectureModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLectureModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
