import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendCarouselComponent } from './recommend-carousel.component';

describe('RecommendCarouselComponent', () => {
  let component: RecommendCarouselComponent;
  let fixture: ComponentFixture<RecommendCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecommendCarouselComponent]
    });
    fixture = TestBed.createComponent(RecommendCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
