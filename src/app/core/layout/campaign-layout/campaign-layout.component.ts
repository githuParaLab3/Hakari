import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-campaign-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './campaign-layout.component.html',
  styleUrls: ['./campaign-layout.component.css']
})
export class CampaignLayoutComponent {
  isSidePanelOpen = false;

  toggleSidePanel() {
    this.isSidePanelOpen = !this.isSidePanelOpen;
  }
}