import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NajdPartnershipComponent } from './najd-partnership.component';

describe('NajdPartnershipComponent', () => {
  let component: NajdPartnershipComponent;
  let fixture: ComponentFixture<NajdPartnershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NajdPartnershipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NajdPartnershipComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
