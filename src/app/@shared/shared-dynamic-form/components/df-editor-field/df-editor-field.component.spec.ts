import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DfEditorFieldComponent } from './df-editor-field.component';

describe('DfEditorFieldComponent', () => {
  let component: DfEditorFieldComponent;
  let fixture: ComponentFixture<DfEditorFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DfEditorFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DfEditorFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
