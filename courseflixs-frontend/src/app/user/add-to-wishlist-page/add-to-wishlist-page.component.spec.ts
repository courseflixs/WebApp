import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToWishlistPageComponent } from './add-to-wishlist-page.component';

describe('AddToWishlistPageComponent', () => {
  let component: AddToWishlistPageComponent;
  let fixture: ComponentFixture<AddToWishlistPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddToWishlistPageComponent]
    });
    fixture = TestBed.createComponent(AddToWishlistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
