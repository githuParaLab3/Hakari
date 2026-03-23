import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpcViewComponent } from './npc-view.component';

describe('NpcViewComponent', () => {
  let component: NpcViewComponent;
  let fixture: ComponentFixture<NpcViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NpcViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NpcViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
