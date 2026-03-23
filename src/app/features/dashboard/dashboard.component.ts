import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CampaignService } from '../campaigns/campaign.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  campaigns: any[] = [];
  userId: string | undefined;

  constructor(
    private campaignService: CampaignService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    const { data } = await this.authService.session;
    this.userId = data.session?.user.id;
    this.loadCampaigns();
  }

  async loadCampaigns() {
    const { data, error } = await this.campaignService.getCampaigns();
    if (data) {
      this.campaigns = data;
    }
  }

  async createNewCampaign() {
    if (!this.userId) return;
    const name = prompt('Nome da campanha:');
    if (!name) return;
    
    const description = prompt('Descrição:');
    await this.campaignService.createCampaign(name, description || '', this.userId);
    this.loadCampaigns();
  }

  openCampaign(id: string) {
    this.router.navigate(['/campaign', id]);
  }
}