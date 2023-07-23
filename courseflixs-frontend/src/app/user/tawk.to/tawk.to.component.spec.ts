import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TawkToComponent } from './tawk.to.component';

describe('TawkToComponent', () => {
  let component: TawkToComponent;
  let fixture: ComponentFixture<TawkToComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TawkToComponent]
    });
    fixture = TestBed.createComponent(TawkToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
