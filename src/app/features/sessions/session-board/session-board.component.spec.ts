import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionBoardComponent } from './session-board.component';

describe('SessionBoardComponent', () => {
  let component: SessionBoardComponent;
  let fixture: ComponentFixture<SessionBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
