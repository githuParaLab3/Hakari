import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ResourceService } from '../resource.service';
import { SafeUrlPipe } from '../../../shared/pipes/safe-url.pipe';

@Component({
  selector: 'app-resource-view',
  standalone: true,
  imports: [CommonModule, FormsModule, SafeUrlPipe],
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
      const { data } = await this.resourceService.getResourceById(id);
      if (data) {
        this.resource = data;
      }
    }
  }

  async saveResource() {
    if (this.resource) {
      await this.resourceService.updateResource(this.resource.id, this.resource);
    }
  }
}