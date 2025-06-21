import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAboutContentComponentComponent } from './admin-about-content-component.component';

describe('AdminAboutContentComponentComponent', () => {
  let component: AdminAboutContentComponentComponent;
  let fixture: ComponentFixture<AdminAboutContentComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAboutContentComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAboutContentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
