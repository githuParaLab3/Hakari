import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: any[] = [];
  campaignId: string | null = null;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
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
    }
  }

  async createNewItem() {
    if (!this.campaignId) return;
    const name = prompt('Nome do Item:');
    if (!name) return;
    const valueStr = prompt('Valor (ouro):') || '0';
    const value = parseFloat(valueStr) || 0;
    await this.itemService.createItem(this.campaignId, name, value);
    await this.loadItems();
  }

  openItem(itemId: string) {
    this.router.navigate(['../item', itemId], { relativeTo: this.route });
  }
}