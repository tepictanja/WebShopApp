import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCommentModalComponent } from './new-comment-modal.component';

describe('NewCommentModalComponent', () => {
  let component: NewCommentModalComponent;
  let fixture: ComponentFixture<NewCommentModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewCommentModalComponent]
    });
    fixture = TestBed.createComponent(NewCommentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
