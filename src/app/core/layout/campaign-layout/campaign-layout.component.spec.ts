import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignLayoutComponent } from './campaign-layout.component';

describe('CampaignLayoutComponent', () => {
  let component: CampaignLayoutComponent;
  let fixture: ComponentFixture<CampaignLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
