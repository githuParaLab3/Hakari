import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationPanelComponent } from './relation-panel.component';

describe('RelationPanelComponent', () => {
  let component: RelationPanelComponent;
  let fixture: ComponentFixture<RelationPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelationPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
