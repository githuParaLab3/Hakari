import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LocationService } from '../location.service';
import { ContextService } from '../../../../core/context.service';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-location-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
  locations: any[] = [];
  filteredLocations: any[] = [];
  campaignId: string | null = null;
  searchTerm: string = '';

  isModalOpen = false;
  formData = { name: '', type: '' };

  constructor(
    private locationService: LocationService,
    private route: ActivatedRoute,
    private router: Router,
    private contextService: ContextService
  ) {}

  async ngOnInit() {
    this.campaignId = this.route.parent?.snapshot.paramMap.get('id') || null;
    if (this.campaignId) {
      await this.loadLocations();
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
    this.filteredLocations = this.locations.filter(location =>
      location.name.toLowerCase().includes(term) ||
      (location.type && location.type.toLowerCase().includes(term))
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

  openLocation(locationId: string) {
    this.router.navigate(['../location', locationId], { relativeTo: this.route });
  }

  openInContext(event: Event, location: any) {
    event.stopPropagation();
    this.contextService.setContext({ type: 'location', data: location });
  }
}