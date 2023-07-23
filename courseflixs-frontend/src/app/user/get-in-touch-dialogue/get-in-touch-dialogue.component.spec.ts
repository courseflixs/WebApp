import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetInTouchDialogueComponent } from './get-in-touch-dialogue.component';

describe('GetInTouchDialogueComponent', () => {
  let component: GetInTouchDialogueComponent;
  let fixture: ComponentFixture<GetInTouchDialogueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetInTouchDialogueComponent]
    });
    fixture = TestBed.createComponent(GetInTouchDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
