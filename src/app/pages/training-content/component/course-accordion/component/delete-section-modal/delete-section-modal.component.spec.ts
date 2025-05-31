import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSectionModalComponent } from './delete-section-modal.component';

describe('DeleteSectionModalComponent', () => {
  let component: DeleteSectionModalComponent;
  let fixture: ComponentFixture<DeleteSectionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteSectionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
