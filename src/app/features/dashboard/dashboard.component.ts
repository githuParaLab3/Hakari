import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CampaignService } from '../campaigns/campaign.service';
import { AuthService } from '../../core/auth.service';
import { ThemeService } from '../../core/theme.service';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { RealtimeSyncService } from '../../core/realtime-sync.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  campaigns: any[] = [];
  filteredCampaigns: any[] = [];
  userId: string | undefined;
  searchTerm: string = '';

  isModalOpen = false;
  formData = { name: '', description: '' };
  private syncSub!: Subscription;

  constructor(
    private campaignService: CampaignService,
    private authService: AuthService,
    private router: Router,
    public themeService: ThemeService,
    private realtimeSync: RealtimeSyncService
  ) {}

  async ngOnInit() {
    const { data } = await this.authService.session;
    this.userId = data.session?.user.id;
    await this.loadCampaigns();

    this.syncSub = this.realtimeSync.sync$.subscribe(async (event) => {
      if (event.table === 'campaigns') {
        await this.loadCampaigns();
      }
    });
  }

  ngOnDestroy() {
    if (this.syncSub) {
      this.syncSub.unsubscribe();
    }
  }

  async loadCampaigns() {
    const { data, error } = await this.campaignService.getCampaigns();
    if (data) {
      this.campaigns = data;
      this.filterData();
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
  }

  openCampaign(id: string) {
    this.router.navigate(['/campaign', id]);
  }

  async logout() {
    await this.authService.signOut();
    this.router.navigate(['/login']);
  }
}