import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-location-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
  locations: any[] = [];
  campaignId: string | null = null;

  constructor(
    private locationService: LocationService,
    private route: ActivatedRoute,
    private router: Router
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
    }
  }

  async createNewLocation() {
    if (!this.campaignId) return;
    const name = prompt('Nome do Local:');
    if (!name) return;
    const type = prompt('Tipo (ex: Cidade, Masmorra, Taverna):') || '';
    await this.locationService.createLocation(this.campaignId, name, type);
    await this.loadLocations();
  }

  openLocation(locationId: string) {
    this.router.navigate(['../location', locationId], { relativeTo: this.route });
  }
}