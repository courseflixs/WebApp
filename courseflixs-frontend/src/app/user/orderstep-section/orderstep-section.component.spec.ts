import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderstepSectionComponent } from './orderstep-section.component';

describe('OrderstepSectionComponent', () => {
  let component: OrderstepSectionComponent;
  let fixture: ComponentFixture<OrderstepSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderstepSectionComponent]
    });
    fixture = TestBed.createComponent(OrderstepSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
