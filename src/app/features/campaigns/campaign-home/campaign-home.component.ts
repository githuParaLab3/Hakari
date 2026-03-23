import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-campaign-home',
  standalone: true,
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