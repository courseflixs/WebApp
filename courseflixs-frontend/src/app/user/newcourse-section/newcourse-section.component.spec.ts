import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcourseSectionComponent } from './newcourse-section.component';

describe('NewcourseSectionComponent', () => {
  let component: NewcourseSectionComponent;
  let fixture: ComponentFixture<NewcourseSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewcourseSectionComponent]
    });
    fixture = TestBed.createComponent(NewcourseSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
