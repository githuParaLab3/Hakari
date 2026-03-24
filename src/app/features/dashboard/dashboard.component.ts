import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CampaignService } from '../campaigns/campaign.service';
import { AuthService } from '../../core/auth.service';
import { ThemeService } from '../../core/theme.service';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  campaigns: any[] = [];
  filteredCampaigns: any[] = [];
  userId: string | undefined;
  searchTerm: string = '';

  isModalOpen = false;
  formData = { name: '', description: '' };

  constructor(
    private campaignService: CampaignService,
    private authService: AuthService,
    private router: Router,
    public themeService: ThemeService
  ) {}

  async ngOnInit() {
    const { data } = await this.authService.session;
    this.userId = data.session?.user.id;
    await this.loadCampaigns();
  }

  async loadCampaigns() {
    const { data, error } = await this.campaignService.getCampaigns();
    if (data) {
      this.campaigns = data;
      this.filteredCampaigns = data;
    }
  }

  filterData() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredCampaigns = this.campaigns;
      return;
    }
    this.filteredCampaigns = this.campaigns.filter(campaign =>
      campaign.name.toLowerCase().includes(term) ||
      (campaign.description && campaign.description.toLowerCase().includes(term))
    );
  }

  openModal() {
    this.formData = { name: '', description: '' };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async confirmModal() {
    if (!this.userId || !this.formData.name.trim()) return;
    await this.campaignService.createCampaign(this.formData.name, this.formData.description, this.userId);
    this.closeModal();
    await this.loadCampaigns();
  }

  openCampaign(id: string) {
    this.router.navigate(['/campaign', id]);
  }

  async logout() {
    await this.authService.signOut();
    this.router.navigate(['/login']);
  }
}