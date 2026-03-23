import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MapService } from '../map.service';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {
  mapData: any = null;

  constructor(
    private route: ActivatedRoute,
    private mapService: MapService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('mapId');
    if (id) {
      const { data } = await this.mapService.getMap(id);
      this.mapData = data;
    }
  }
}