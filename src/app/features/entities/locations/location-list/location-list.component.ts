import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LocationService } from '../location.service';
import { ContextService } from '../../../../core/context.service';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { RealtimeSyncService } from '../../../../core/realtime-sync.service';

@Component({
  selector: 'app-location-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit, OnDestroy {
  locations: any[] = [];
  filteredLocations: any[] = [];
  campaignId: string | null = null;
  searchTerm: string = '';
  isModalOpen = false;
  formData = { name: '', type: '' };
  private syncSub!: Subscription;

  constructor(
    private locationService: LocationService,
    private route: ActivatedRoute,
    private router: Router,
    private contextService: ContextService,
    private realtimeSync: RealtimeSyncService
  ) {}

  async ngOnInit() {
    this.campaignId = this.route.parent?.snapshot.paramMap.get('id') || null;
    if (this.campaignId) {
      await this.loadLocations();
    }
    this.syncSub = this.realtimeSync.sync$.subscribe(async (event) => {
      if (event.table === 'locations') {
        await this.loadLocations();
      }
    });
  }

  ngOnDestroy() {
    if (this.syncSub) {
      this.syncSub.unsubscribe();
    }
  }

  async loadLocations() {
    if (!this.campaignId) return;
    const { data } = await this.locationService.getLocations(this.campaignId);
    if (data) {
      this.locations = data;
      this.filteredLocations = data;
    }
  }

  filterData() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredLocations = this.locations;
      return;
    }
    this.filteredLocations = this.locations.filter(loc =>
      loc.name.toLowerCase().includes(term) ||
      (loc.type && loc.type.toLowerCase().includes(term))
    );
  }

  openModal() {
    this.formData = { name: '', type: '' };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async confirmModal() {
    if (!this.campaignId || !this.formData.name.trim()) return;
    await this.locationService.createLocation(this.campaignId, this.formData.name, this.formData.type);
    this.closeModal();
    await this.loadLocations();
  }

  openLocation(locId: string) {
    this.router.navigate(['../location', locId], { relativeTo: this.route });
  }

  openInContext(event: Event, loc: any) {
    event.stopPropagation();
    this.contextService.setContext({ type: 'location', data: loc });
  }
}