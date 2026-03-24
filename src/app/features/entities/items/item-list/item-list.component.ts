import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../item.service';
import { ContextService } from '../../../../core/context.service';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: any[] = [];
  filteredItems: any[] = [];
  campaignId: string | null = null;
  searchTerm: string = '';

  isModalOpen = false;
  formData = { name: '', value: 0 };

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router,
    private contextService: ContextService
  ) {}

  async ngOnInit() {
    this.campaignId = this.route.parent?.snapshot.paramMap.get('id') || null;
    if (this.campaignId) {
      await this.loadItems();
    }
  }

  async loadItems() {
    if (!this.campaignId) return;
    const { data } = await this.itemService.getItems(this.campaignId);
    if (data) {
      this.items = data;
      this.filteredItems = data;
    }
  }

  filterData() {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredItems = this.items;
      return;
    }
    this.filteredItems = this.items.filter(item =>
      item.name.toLowerCase().includes(term)
    );
  }

  openModal() {
    this.formData = { name: '', value: 0 };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async confirmModal() {
    if (!this.campaignId || !this.formData.name.trim()) return;
    await this.itemService.createItem(this.campaignId, this.formData.name, this.formData.value);
    this.closeModal();
    await this.loadItems();
  }

  openItem(itemId: string) {
    this.router.navigate(['../item', itemId], { relativeTo: this.route });
  }

  openInContext(event: Event, item: any) {
    event.stopPropagation();
    this.contextService.setContext({ type: 'item', data: item });
  }
}