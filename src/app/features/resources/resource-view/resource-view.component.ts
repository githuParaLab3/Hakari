import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ResourceService } from '../resource.service';

@Component({
  selector: 'app-resource-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resource-view.component.html',
  styleUrls: ['./resource-view.component.css']
})
export class ResourceViewComponent implements OnInit {
  resource: any = null;

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('resourceId');
    if (id) {
      const { data } = await this.resourceService.getResource(id);
      this.resource = data;
    }
  }
}