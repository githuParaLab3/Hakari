import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-campaign-layout',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './campaign-layout.component.html',
  styleUrls: ['./campaign-layout.component.css']
})
export class CampaignLayoutComponent implements OnInit {
  isSidePanelOpen = false;

  ngOnInit() {}

  toggleSidePanel() {
    this.isSidePanelOpen = !this.isSidePanelOpen;
  }
}