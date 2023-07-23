import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrderPageComponent } from './my-order-page.component';

describe('MyOrderPageComponent', () => {
  let component: MyOrderPageComponent;
  let fixture: ComponentFixture<MyOrderPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyOrderPageComponent]
    });
    fixture = TestBed.createComponent(MyOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
