import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MapService } from '../map.service';
import { ContextService } from '../../../../core/context.service';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-map-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './map-list.component.html',
  styleUrls: ['./map-list.component.css']
})
export class MapListComponent implements OnInit {
  maps: any[] = [];
  filteredMaps: any[] = [];
  campaignId: string | null = null;
  searchTerm: string = '';

  isModalOpen = false;
  formData = { name: '', type: 'Regional' };

  constructor(
    private mapService: MapService,
    private route: ActivatedRoute,
    private router: Router,
    private contextService: ContextService
  ) {}

  async ngOnInit() {
    this.campaignId = this.route.parent?.snapshot.paramMap.get('id') || null;
    if (this.campaignId) {
      await this.loadMaps();
    }
  }

  async loadMaps() {
    if (!this.campaignId) return;
    const { data } = await this.mapService.getMaps(this.campaignId);
    if (data) {
      this.maps = data;
      this.filteredMaps = data;
    }
  }

  filterData() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredMaps = this.maps;
      return;
    }
    this.filteredMaps = this.maps.filter(mapItem =>
      mapItem.name.toLowerCase().includes(term) ||
      (mapItem.type && mapItem.type.toLowerCase().includes(term))
    );
  }

  openModal() {
    this.formData = { name: '', type: 'Regional' };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async confirmModal() {
    if (!this.campaignId || !this.formData.name.trim()) return;
    await this.mapService.createMap(this.campaignId, this.formData.name, this.formData.type);
    this.closeModal();
    await this.loadMaps();
  }

  openMap(mapId: string) {
    this.router.navigate(['../map', mapId], { relativeTo: this.route });
  }

  openInContext(event: Event, mapData: any) {
    event.stopPropagation();
    this.contextService.setContext({ type: 'map', data: mapData });
  }
}