import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-campaign-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './campaign-home.component.html',
  styleUrls: ['./campaign-home.component.css']
})
export class CampaignHomeComponent implements OnInit {
  campaignId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.campaignId = this.route.snapshot.paramMap.get('id');
  }
}