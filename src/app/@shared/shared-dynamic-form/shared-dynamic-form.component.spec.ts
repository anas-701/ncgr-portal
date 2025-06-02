import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDynamicFormComponent } from './shared-dynamic-form.component';

describe('SharedDynamicFormComponent', () => {
  let component: SharedDynamicFormComponent;
  let fixture: ComponentFixture<SharedDynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedDynamicFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
