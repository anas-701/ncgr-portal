import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInfoModalComponent } from './test-info-modal.component';

describe('TestInfoModalComponent', () => {
  let component: TestInfoModalComponent;
  let fixture: ComponentFixture<TestInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestInfoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
