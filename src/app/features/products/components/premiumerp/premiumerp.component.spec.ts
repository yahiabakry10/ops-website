import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumerpComponent } from './premiumerp.component';

describe('PremiumerpComponent', () => {
  let component: PremiumerpComponent;
  let fixture: ComponentFixture<PremiumerpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiumerpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PremiumerpComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
