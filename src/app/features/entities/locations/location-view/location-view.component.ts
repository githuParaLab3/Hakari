import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LocationService } from '../location.service';
import { RelationPanelComponent } from '../../../../shared/components/relation-panel/relation-panel.component';

@Component({
  selector: 'app-location-view',
  standalone: true,
  imports: [CommonModule, FormsModule, RelationPanelComponent],
  templateUrl: './location-view.component.html',
  styleUrls: ['./location-view.component.css']
})
export class LocationViewComponent implements OnInit {
  location: any = null;

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('locationId');
    if (id) {
      const { data } = await this.locationService.getLocation(id);
      this.location = data;
    }
  }
}