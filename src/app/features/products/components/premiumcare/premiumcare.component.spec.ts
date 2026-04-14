import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumcareComponent } from './premiumcare.component';

describe('PremiumcareComponent', () => {
  let component: PremiumcareComponent;
  let fixture: ComponentFixture<PremiumcareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiumcareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PremiumcareComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
