import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from '../resource.service';

@Component({
  selector: 'app-resource-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css']
})
export class ResourceListComponent implements OnInit {
  resources: any[] = [];
  campaignId: string | null = null;

  constructor(
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.campaignId = this.route.parent?.snapshot.paramMap.get('id') || null;
    if (this.campaignId) {
      await this.loadResources();
    }
  }

  async loadResources() {
    if (!this.campaignId) return;
    const { data } = await this.resourceService.getResources(this.campaignId);
    if (data) {
      this.resources = data;
    }
  }

  async createNewResource() {
    if (!this.campaignId) return;
    const title = prompt('Título do Recurso:');
    if (!title) return;
    const type = prompt('Tipo (PDF, URL, Image):') || 'URL';
    await this.resourceService.createResource(this.campaignId, title, type);
    await this.loadResources();
  }

  openResource(resourceId: string) {
    this.router.navigate(['../resource', resourceId], { relativeTo: this.route });
  }
}