import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DfFileFieldComponent } from './df-file-field.component';

describe('DfFileFieldComponent', () => {
  let component: DfFileFieldComponent;
  let fixture: ComponentFixture<DfFileFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DfFileFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DfFileFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
