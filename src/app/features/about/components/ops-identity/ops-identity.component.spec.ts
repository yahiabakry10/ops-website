import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpsIdentityComponent } from './ops-identity.component';

describe('OpsIdentityComponent', () => {
  let component: OpsIdentityComponent;
  let fixture: ComponentFixture<OpsIdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpsIdentityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpsIdentityComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
