import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MapService } from '../map.service';

@Component({
  selector: 'app-map-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-list.component.html',
  styleUrls: ['./map-list.component.css']
})
export class MapListComponent implements OnInit {
  maps: any[] = [];
  campaignId: string | null = null;

  constructor(
    private mapService: MapService,
    private route: ActivatedRoute,
    private router: Router
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
    }
  }

  async createNewMap() {
    if (!this.campaignId) return;
    const name = prompt('Nome do Mapa:');
    if (!name) return;
    const type = prompt('Tipo (Regional, Dungeon, Cidade):') || 'Regional';
    await this.mapService.createMap(this.campaignId, name, type);
    await this.loadMaps();
  }

  openMap(mapId: string) {
    this.router.navigate(['../map', mapId], { relativeTo: this.route });
  }
}