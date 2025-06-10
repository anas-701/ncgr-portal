import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatesInfoComponent } from './certificates-info.component';

describe('CertificatesInfoComponent', () => {
  let component: CertificatesInfoComponent;
  let fixture: ComponentFixture<CertificatesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificatesInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificatesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
