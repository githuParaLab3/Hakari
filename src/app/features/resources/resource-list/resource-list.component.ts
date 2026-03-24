import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ResourceService } from '../resource.service';
import { ContextService } from '../../../core/context.service';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-resource-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css']
})
export class ResourceListComponent implements OnInit {
  resources: any[] = [];
  filteredResources: any[] = [];
  campaignId: string | null = null;
  searchTerm: string = '';

  isModalOpen = false;
  formData = { title: '', type: 'URL' };

  constructor(
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private router: Router,
    private contextService: ContextService
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
      this.filteredResources = data;
    }
  }

  filterData() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredResources = this.resources;
      return;
    }
    this.filteredResources = this.resources.filter(resource =>
      resource.title.toLowerCase().includes(term) ||
      (resource.type && resource.type.toLowerCase().includes(term))
    );
  }

  openModal() {
    this.formData = { title: '', type: 'URL' };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async confirmModal() {
    if (!this.campaignId || !this.formData.title.trim()) return;
    await this.resourceService.createResource(this.campaignId, this.formData.title, this.formData.type);
    this.closeModal();
    await this.loadResources();
  }

  openResource(resourceId: string) {
    this.router.navigate(['../resource', resourceId], { relativeTo: this.route });
  }

  openInContext(event: Event, resource: any) {
    event.stopPropagation();
    this.contextService.setContext({ type: 'resource', data: resource });
  }
}